//SPDX-License-Identifier: MIT
pragma solidity >=0.8.19;

contract Owner {
    address owner;
    constructor(){
        owner=msg.sender;
    }
}