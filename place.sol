// SPDX-License-Identifier: UNLICENSED
/*
migrate
let accounts = await web3.eth.getAccounts()
let instance = await Place.deployed()
instance.visitFrom(accounts[0],1000)
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
    
    function visitFrom(address user, uint timestamp) external onlyOwner override returns(Interfaces.VisitIf) {
        Visit newVisit = new Visit(this, user, timestamp);
        visits.push(newVisit);
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

    function giveString() external returns(string memory) {
      return 'This is a test string';
    }
}
