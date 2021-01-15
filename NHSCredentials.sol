pragma solidity ^0.8.0;

interface NHSCredentials {
    function verify(address) external returns(bool);
}
