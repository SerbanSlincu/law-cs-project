// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import * as Interfaces from "interfaces.sol";
import "ownable.sol";

contract Visit is Ownable, Interfaces.VisitIf {
    bool public riskState;
    Interfaces.PlaceIf public place;
    address public user;
    uint private timestamp;
   
    constructor(Interfaces.PlaceIf _place, address _user, uint _timestamp) {
        riskState = false;
        place = _place;
        user = _user;
        timestamp = _timestamp;
    }

    function getTimestamp() external override view returns(uint) {
        return timestamp;
    }
   
    function recordPositiveTest(Interfaces.NHSCredentialsIf nhsCredentials) external override {
        require(user == msg.sender, "Visit: caller is not the original user");
        
        if (nhsCredentials.verify(user)) {
            riskState = true;
            place.notifyRisk(this);
        }
    }
   
    function notifyRisk() external override onlyOwner {
        riskState = true;
    }
}
