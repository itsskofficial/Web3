//SPDX-License-Identifier: MIT
pragma solidity >=0.8.19;

contract Faucet{
    uint public noOfFunders;
    mapping(uint=>address) public funders;

    receive() external payable {}

    function addFunds() external payable {
        uint index = noOfFunders++;
        funders[index]=msg.sender;
    }

    function getFunders() public view returns (address[] memory){
        address[] memory allFunders =
        return funders;
    }

    function getFunder(uint8 index) external view returns (address){
        return funders[index];
    }
}