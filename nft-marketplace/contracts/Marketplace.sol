// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

//internal imports for nft openzeppelin
import '@openzeppelin/contracts/utils/Counters.sol'; //using as a contract counter
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import 'hardhat/console.sol';

contract Marketplace is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _tokensSold;
    address payable owner;
    mapping(uint256=>MarketItem) private idMarketItem;
}