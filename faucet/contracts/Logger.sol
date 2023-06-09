//SPDX-License-Identifier: MIT
pragma solidity >=0.8.19;

abstract contract Logger{
    function log() public pure virtual returns (bytes32);
}