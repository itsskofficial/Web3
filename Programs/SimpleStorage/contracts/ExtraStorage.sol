// SPDX-License-Identifier: MIT
pragma solidity >=0.6.12 <0.9.0;

import "./SimpleStorage.sol";

contract ExtraStorage is SimpleStorage {
    function store(uint256 _favouriteNumber) public override {
        favouriteNumber = _favouriteNumber + 5;
    }
}