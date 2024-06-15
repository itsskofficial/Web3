// SPDX-License-Identifier: MIT
pragma solidity >=0.6.12 <0.9.0;

import "./PriceConverter.sol";
import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

error NotOwner();

contract FundMe {
    using PriceConverter for uint256;

    uint256 public constant MIN_USD = 50 * 1e18;
    address[] public funders;
    mapping(address => uint256) public addressToAmountFunded;
    address public immutable owner;
    AggregatorV3Interface public priceFeed;

    constructor(address priceFeedAddress) {
        owner = msg.sender;
        priceFeed = AggregatorV3Interface(priceFeedAddress);
    }

    function fund() public payable {
        require(msg.value.getConversionRate(priceFeed) >= MIN_USD, "Atleast 50 USD required");
        funders.push(msg.sender);
        addressToAmountFunded[msg.sender] = msg.value;
    }

    function withdraw() public onlyOwner {
        for (uint256 funderIndex = 0; funderIndex < funders.length; funderIndex += 1) {
            address funder = funders[funderIndex];
            addressToAmountFunded[funder] = 0;

            funders = new address[](0);
        }

        // //transfer
        // payable (msg.sender).transfer(address(this).balance);

        // //send
        // bool sendSuccess = payable (msg.sender).send(address(this).balance);
        // require(sendSuccess, "Send failed");

        //call
        (bool callSuccess,) = payable (msg.sender).call{value: address(this).balance}("");
        require(callSuccess, "Call failed");
    }

    modifier onlyOwner {
        // require(msg.sender == owner, "Sender is not owner");
        if (msg.sender != owner) {
            revert NotOwner();
        }
        _;

    }

    receive() external payable { 
        fund();
    }
    
    fallback() external payable { 
        fund();
    }
}