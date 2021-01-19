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

import "visit.sol";
import "ownable.sol";
import "DateTime.sol";

contract Place is Ownable, Interfaces.PlaceIf {
    Visit[] private visits;
    DateTime dateTime;
    
    constructor() {} 
    
    function notifyRisk(Interfaces.VisitIf infectedVisit) external override {
        bool trackedVisit = false;
        for (uint i = 0; i < visits.length; i ++) {
            trackedVisit = trackedVisit || (visits[i] == infectedVisit);
        }
        require(trackedVisit, "Place: caller is not a tracked visit");

        for (uint i = 0; i < visits.length; i ++) {
            Visit currVisit = visits[i];
            if (dateTime.closeTo(currVisit.getTimestamp(), infectedVisit.getTimestamp())) {
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
        Visit[] storage updatedVisits;
        for (uint i = 0; i < visits.length; i ++) {
            if (dateTime.closeTo(visits[i].getTimestamp(), block.timestamp)) {
                updatedVisits.push(visits[i]);
            }
        }
        visits = updatedVisits;
    }
}
