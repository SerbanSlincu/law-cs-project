// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import * as Interfaces from "interfaces.sol";

contract NHSCredentials is Interfaces.NHSCredentialsIf {
    function verify(address) external override returns(bool) {
      return true;
    }
}
