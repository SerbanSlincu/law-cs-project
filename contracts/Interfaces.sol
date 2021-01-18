// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "DateTime.sol";

interface NHSCredentialsIf {
    function verify(address) external view returns(bool);
}

interface VisitIf {
    // bool riskState;
    
    /* will call Place.visit
    constructor (PlaceIf, address, uint); */

    function getTimestamp() external returns(uint);
    
    /* called by the User App */
    function recordPositiveTest(NHSCredentialsIf) external;
    
    /* called only by the corresponding Place */
    function notifyRisk() external;
}

interface PlaceIf {
    /* take the name
    constructor(string); */
    
    /* called by one "positive" Visit */
    function notifyRisk(VisitIf) external;
   
    function visitFrom(address, uint) external returns(VisitIf);

    function clean() external;
}
