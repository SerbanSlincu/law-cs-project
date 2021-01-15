pragma solidity ^0.8.0;

import "place.sol";
import "NHSCredentials.sol";

contract Visit {
    bool public riskState;
    Place public place;
    address public user;
    uint private timestamp;
   
    constructor(Place _place, address _user, uint _timestamp) {
        place = _place;
        user = _user;
        timestamp = _timestamp;
    }

    function getTimestamp() external view returns(uint) {
        return timestamp;
    }
   
    function recordPositiveTest(NHSCredentials nhsCredentials) external {
        // something with isOwned by the user
        if (nhsCredentials.verify(user)) {
            riskState = true;
            place.notifyRisk(this);
        }
    }
   
    function notifyRisk() external {
        // msg.sender should == place
        // something with isOwned by the place
        riskState = true;
    }
}
