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
    uint256 listingPrice = 0.0025 ether;
    address payable owner;
    mapping(uint256=>MarketItem) private idMarketItem;

    struct MarketItem {
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool isSold;
    }

    event idMarketItemCreated {
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool isSold
    };

    modifier onlyOwner() {
        require(msg.sender == owner, 'only owner of the marketplace can change the listing price');
        _;
    }

    constructor () ERC721('NFT Token', 'NFT') {
        owner == payable(msg.sender);
    }

    function updateListingPrice(uint256 listingPrice) public payable onlyOwner {


    }

    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    function createToken(string memory tokenURI, uint256 price) public payable returns (uint) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        createMarketItem(newTokenId, price);

        
    }
    
}