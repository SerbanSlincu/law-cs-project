pragma solidity ^0.8.0;

import "visit.sol";
import "ownable.sol";
import "DateTime.sol";

contract Place is Ownable {
    Visit[] private visits;
    DateTime dateTime;
    
    constructor() {} 
    
    function notifyRisk(Visit infectedVisit) external {
        for (uint i = 0; i < visits.length; i ++) {
            Visit currVisit = visits[i];
            if (dateTime.closeTo(currVisit.getTimestamp(), infectedVisit.getTimestamp())) {
                currVisit.notifyRisk();
            }
        }
    }
    
    function visitFrom(address user, uint timestamp) external onlyOwner returns(Visit) {
        Visit newVisit = new Visit(this, user, timestamp);
        visits.push(newVisit);
        return newVisit;
    }
    
    function clean() external onlyOwner {
        Visit[] storage updatedVisits;
        for (uint i = 0; i < visits.length; i ++) {
            if (dateTime.closeTo(visits[i].getTimestamp(), block.timestamp)) {
                updatedVisits.push(visits[i]);
            }
        }
        visits = updatedVisits;
    }
}
