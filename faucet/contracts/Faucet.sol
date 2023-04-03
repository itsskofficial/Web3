//SPDX-License-Identifier: MIT
pragma solidity >=0.8.19;

contract Faucet{
    uint public noOfFunders;
    address owner;
    mapping(uint=>address) public funders;
    mapping(address=>bool) public fundersExist;

    receive() external payable {}

    function addFunds() external payable {
        uint index = noOfFunders++;
        address funder = msg.sender;
        if (!fundersExist[funder]){
            fundersExist[funder]=true;
            funders[index]=funder;
        }
    }

    function getFunders() public view returns (address[] memory){
        address[] memory allFunders = new address[](noOfFunders);
        for (uint i=0; i<noOfFunders; i++){
            allFunders[i] = funders[i];
        }
        return allFunders;
    }

    function getFunder(uint8 index) external view returns (address){
        return funders[index];
    }

    function withdraw(uint amount) external withdrawLimit() {
        payable(msg.sender).transfer(amount);
    }
}