pragma solidity ^0.5.0;

interface NHSCredentials {
    function verify() external view returns(bool);
}

contract DateTime {
    uint16 year;
    uint8 month;
    uint8 day;
    uint8 hour;
    uint8 minute;
    uint8 second;
    uint8 weekday;
}
