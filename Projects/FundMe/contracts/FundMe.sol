// SPDX-License-Identifier: MIT
pragma solidity >=0.6.12 <0.9.0;

import "./PriceConverter.sol";
import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

error FundMe__NotOwner();

/** 
 * @title FundMe
 * @author @itsskofficial  
 * @notice A contract to fund the project
 * @dev This contract is used to fund the project
 */

contract FundMe {
    using PriceConverter for uint256;

    uint256 public constant MIN_USD = 50 * 1e18;
    address[] public s_funders;
    mapping(address => uint256) public s_addressToAmountFunded;
    address public immutable i_owner;
    AggregatorV3Interface public s_priceFeed;

    modifier onlyOwner {
        // require(msg.sender == owner, "Sender is not owner");
        if (msg.sender != i_owner) {
            revert FundMe__NotOwner(); // revert("Sender is not owner"); 
        }
        _;
    }

    constructor(address priceFeedAddress) {
        i_owner = msg.sender;
        s_priceFeed = AggregatorV3Interface(priceFeedAddress);
    }

    function fund() public payable {
        require(msg.value.getConversionRate(s_priceFeed) >= MIN_USD, "Atleast 50 USD required");
        s_funders.push(msg.sender);
        s_addressToAmountFunded[msg.sender] = msg.value;
    }

    function withdraw() public onlyOwner {
        address[] memory funders = s_funders;

        for (uint256 funderIndex = 0; funderIndex < funders.length; funderIndex += 1) {
            address funder = funders[funderIndex];
            s_addressToAmountFunded[funder] = 0;
        }

        s_funders = new address[](0);

        (bool callSuccess,) = payable (msg.sender).call{value: address(this).balance}("");
        require(callSuccess, "Call failed");
    }

    function getPriceFeed() public view returns (AggregatorV3Interface) {
        return s_priceFeed;
    }

    function getFunders() public view returns (address[] memory) {
        return s_funders;
    }

    function getAddressToAmountFunded() public view returns (mapping(address => uint256)) {
        return s_addressToAmountFunded;
    }
}