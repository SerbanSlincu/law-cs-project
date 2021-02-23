pragma solidity ^0.8.0;

import "../contracts/Ownable.sol";

contract Simple is Ownable {
    string public data = "test";
    constructor(string memory _data) {
        data = _data;
    } 
}
