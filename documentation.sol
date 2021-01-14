pragma solidity ^0.5.0;

interface NHSCredentials {
    function verify() external view returns(bool);
}

interface Visit {
    // bool riskState;
    
    /* will call Place.visit
    constructor (DateTime, Place); */
    
    /* called by the User App */
    function recordPositiveTest(NHSCredentials) external view;
    
    /* called only by the corresponding Place */
    function notifyRisk(Place) external view;
}

interface Place {
    /* take the name
    constructor(string); */
    
    /* called by one "positive" Visit */
    function notifyRisk() external view;
   
    function visit(DateTime, Visit) external view;
}

struct DateTime {
        uint16 year;
        uint8 month;
        uint8 day;
        uint8 hour;
        uint8 minute;
        uint8 second;
        uint8 weekday;
}
