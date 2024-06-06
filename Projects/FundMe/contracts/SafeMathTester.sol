// SPDX-License-Identifier: MIT
pragma solidity >=0.6.12 <0.9.0;

contract SafeMathTester {
    uint256 public bigNumber = 255;

    function add() public {
        unchecked {bigNumber = bigNumber + 1;}
    }
}