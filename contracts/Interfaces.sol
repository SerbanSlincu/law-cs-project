// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "DateTime.sol";

interface VisitIf {
    // bool riskState;
    
    /* will call Place.visit
    constructor (PlaceIf, address, uint); */

    function getTimestamp() external returns(uint);
    
    /* called only by the corresponding Place */
    function notifyRisk() external;
}

interface PlaceIf {
    /* take the name
    constructor(recognisedAutority address); */
    
    /* called by one "positive" Visit */
    function notifyRisk(VisitIf) external;
   
    function visitFrom(address, uint) external returns(VisitIf);

    function clean() external;
}
