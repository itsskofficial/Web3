//SPDX-License-Identifier: MIT
pragma solidity >=0.8.19;

contract Faucet{
    address [] public funders;

    receive() external payable {}

    function addFunds() external payable {
        funders.push(msg.sender);
    }

    function getFunders() public view returns (address[] memory){
        return funders;
    }

    function getFunder(uint8 index) external view returns (address){
        address[] memory allFunders = getFunders();
        return allFunders[index];
    }
}