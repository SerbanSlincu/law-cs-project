// SPDX-License-Identifier: UNLICENSED
/*
migrate
let accounts = await web3.eth.getAccounts()
let instance = await Place.deployed()
let dummyCreds = await NHSCredentials.deployed()
let visit = await instance.visitFrom(accounts[0],1000)
let v1 = await Visit.at(visit.logs[0].args['1'])
let otherVisit = await instance.visitFrom(accounts[0],1000)
let v2 = await Visit.at(otherVisit.logs[0].args['1'])
v2.riskState.call()
v1.recordPositiveTest(dummyCreds.address)
*/

pragma solidity ^0.8.0;

import "../contracts/Visit.sol";
import "../contracts/Ownable.sol";

contract Place is Ownable, Interfaces.PlaceIf {
    Visit[] private visits;
    address recognisedAuthority;
    
    constructor(address _recognisedAuthority) {
        recognisedAuthority = _recognisedAuthority;
    } 

    /* Internally used only for notifyRisk calls */
    function closeTo(uint timestamp, uint otherTimestamp) internal pure returns (bool) {
        if (timestamp < otherTimestamp && (otherTimestamp - timestamp < 86400 * 14)) {
            return true;
        }
        if (otherTimestamp <= timestamp && (timestamp - otherTimestamp < 86400 * 14)) {
            return true;
        }
        return false;
    } 
    
    /*Called by health authority*/
    function notifyRisk(Interfaces.VisitIf infectedVisit) external override {
        require(msg.sender == recognisedAuthority, "Place: caller is not a recognised authority");

        bool trackedVisit = false;
        for (uint i = 0; i < visits.length; i ++) {
            trackedVisit = trackedVisit || (visits[i] == infectedVisit);
        }
        require(trackedVisit, "Place: caller is not a tracked visit");

        for (uint i = 0; i < visits.length; i ++) {
            Visit currVisit = visits[i];
            if (closeTo(currVisit.getTimestamp(), infectedVisit.getTimestamp())) {
                currVisit.notifyRisk();
            }
        }
    }

    event visitFromEvent(address user, Interfaces.VisitIf newVisit);
    
    function visitFrom(address user, uint timestamp) external onlyOwner override returns(Interfaces.VisitIf) {
        Visit newVisit = new Visit(this, user, timestamp);
        visits.push(newVisit);
        emit visitFromEvent(user, newVisit);
        return newVisit;
    }
    
    function clean() external override onlyOwner {
        Visit[] memory updatedVisits;
        for (uint i = 0; i < visits.length; i ++) {
            if (closeTo(visits[i].getTimestamp(), block.timestamp)) {
                Visit[] memory updatedVisits2 = new Visit[](updatedVisits.length+1);
                for (uint j = 0; j < updatedVisits.length; j ++) {
                    updatedVisits2[j] = updatedVisits[j];
                }
                updatedVisits2[updatedVisits.length] = visits[i];
                updatedVisits = updatedVisits2;
            }
        }
        visits = updatedVisits;
    }
}
