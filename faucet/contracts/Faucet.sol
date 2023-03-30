//SPDX-License-Identifier: MIT
pragma solidity >=0.8.19;

contract Faucet{
    address [] public funders;

    receive() external payable {}

    function addFunds() external payable {
        funders.push(msg.sender);
    }

    function test() external pure returns (uint256){
        return 2+2;
    }

    function getFunders() external view returns (address[] memory){
        return funders;
    }

    function getFunder(uint8 index) external view returns ()
}