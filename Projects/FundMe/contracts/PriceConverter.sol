// SPDX-License-Identifier: MIT
pragma solidity >=0.6.12 <0.9.0;

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

library PriceConverter {
      function getPrice(AggregatorV3Interface priceFeed) internal view returns(uint256){
        (,int256 price,,,) = priceFeed.latestRoundData();
        return uint256(price * 1e10);
    }

    function getConversionRate(uint256 ethAmount, AggregatorV3Interface priceFeed) internal view returns (uint256) {
        uint256 ethPrice = getPrice(priceFeed);
        uint256 ethAmountInUsd = (ethPrice * ethAmount) / 1e18;
        return ethAmountInUsd;
    }

    function getVersion(AggregatorV3Interface priceFeed) internal view returns(uint256) {
        return priceFeed.version();
    }
}