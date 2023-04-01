//SPDX-License-Identifier: MIT
pragma solidity >=0.8.19;

contract Faucet{
    uint public noOfFunders;
    mapping(uint=>address) public funders;

    receive() external payable {}

    function addFunds() external payable {
        index = noOfFunders++;
    }

    function getFunders() public view returns (address[] memory){
        return funders;
    }

    function getFunder(uint8 index) external view returns (address){
        address[] memory allFunders = getFunders();
        return allFunders[index];
    }
}