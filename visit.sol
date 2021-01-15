pragma solidity ^0.8.0;

import "place.sol";
import "ownable.sol";
import "NHSCredentials.sol";

contract Visit is Ownable {
    bool public riskState;
    Place public place;
    address public user;
    uint private timestamp;
   
    constructor(Place _place, address _user, uint _timestamp) {
        riskState = false;
        place = _place;
        user = _user;
        timestamp = _timestamp;
    }

    function getTimestamp() external view returns(uint) {
        return timestamp;
    }
   
    function recordPositiveTest(NHSCredentials nhsCredentials) external {
        require(user == msg.sender, "Visit: caller is not the original user");

        if (nhsCredentials.verify(user)) {
            riskState = true;
            place.notifyRisk(this);
        }
    }
   
    function notifyRisk() external onlyOwner {
        riskState = true;
    }
}
