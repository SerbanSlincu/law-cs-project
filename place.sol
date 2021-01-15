pragma solidity ^0.8.0;

import "visit.sol";
import "DateTime.sol";

contract Place {
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
    
    // isOwned
    function visitFrom(address user, uint timestamp) external returns(Visit) {
        Visit newVisit = new Visit(this, user, timestamp);
        visits.push(newVisit);
        return newVisit;
    }
    
    // isOwned
    function clean() external {
        
    }
}
