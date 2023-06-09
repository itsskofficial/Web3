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
    mapping(uint256=>NFT) private NFTs;

    struct NFT {
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool isSold;
    }

    event NFTCreated (
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool isSold
    );

    modifier onlyOwner() {
        require(msg.sender == owner, 'only owner of the marketplace can change the listing price');
        _;
    }

    constructor () ERC721('NFT Token', 'NFT') {
        owner == payable(msg.sender);
    }

    function updateListingPrice(uint256 newListingPrice) public payable onlyOwner {
        listingPrice = newListingPrice;
    }

    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    function createToken(string memory tokenURI, uint256 price) public payable returns (uint256) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        createNFT(newTokenId, price);

        return newTokenId;
    }

    function createNFT(uint256 tokenId, uint256 price) private {
        require(price > 0, 'price must be greater than 0');
        require(msg.value == listingPrice, 'price must be equal to listing price');
        NFTs[tokenId] = NFT (
            tokenId,
            payable(msg.sender),
            payable(address(this)),
            price,
            false
        );

        _transfer(msg.sender, address(this), tokenId);

        emit NFTCreated (
            tokenId,
            msg.sender,
            address(this),
            price,
            false
        );
    }

    function resellToken (uint256 tokenId, uint256 price) public payable {
        require(NFTs[tokenId].owner == msg.sender, 'only owner can access resell operation');
        require(msg.value ==  listingPrice, 'price must be equal to listing price');

        NFTs[tokenId].isSold = false;
        NFTs[tokenId].price = price;
        NFTs[tokenId].seller = payable(msg.sender);
        NFTs[tokenId].owner = payable(address(this));
        _tokensSold.decrement();

        _transfer(msg.sender, address(this), tokenId);
    }
    
    function sellNFT(uint256 tokenId) public payable {
        uint256 price = NFTs[tokenId].price;
        require(msg.value == price, 'submit the asking price to complete the order');

        NFTs[tokenId].seller = payable(msg.sender);
        NFTs[tokenId].isSold = true;
        NFTs[tokenId].owner = payable(address(0));
        _tokensSold.increment();

        _transfer(address(this), msg.sender, tokenId);
        payable(owner).transfer(listingPrice);
        payable(NFTs[tokenId].seller).transfer(msg.value);
    }

    function fetchUnsoldNFTs() public view returns (NFT[] memory){
        uint256 itemCount = _tokenIds.current();
        uint256 unsoldItemCount = _tokenIds.current() - _tokensSold.current();
        uint256 currentIndex = 0;

        NFT[] memory unsoldNFTs = new NFT[](unsoldItemCount);

        for (uint256 i = 0; i <itemCount; i++) {
            if (NFTs[i+1].owner == address(this)) {
                uint256 currentId = i+1;
                NFT storage currentItem = NFTs[currentId];
                unsoldNFTs[currentIndex] = currentItem;
                currentIndex += 1;
            }
        
        }  

        return unsoldNFTs; 
    }

    function fetchUserNFTs () public view returns(NFT[] memory) {
        uint256 totalCount = _tokenIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i=0; i<totalCount; i++){
            if (NFTs[i+1].owner == msg.sender) { 
                itemCount += 1;
            }
        }

        NFT[] memory userNFTs = new NFT[](itemCount);
        for (uint256 j = 0; j < totalCount; j++) {
            if (NFTs[j+1].owner == msg.sender){
                uint256 currentId = j+1;
                NFT storage currentItem = NFTs[currentId];
                userNFTs[currentIndex] = currentItem;
                currentIndex += 1;
            }
            
        }

        return userNFTs;
    }

    function fetchUserListedNFTs () public view returns (NFT[] memory){
        uint256 totalCount = _tokenIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i =0; i < totalCount; i++ ){
            if (NFTs[i+1].seller == msg.sender){
                itemCount +=1;
            }
        }

        NFT[] memory userListedNFTs = new NFT[](itemCount);

        for (uint256 j =0; j< totalCount; j++){
            if (NFTs[j+1].seller == msg.sender){
                uint256 currentId = j+1;
                NFT storage currentItem = NFTs[currentId];
                userListedNFTs[currentIndex] = currentItem;
                currentIndex+=1;
            }
        }

        return userListedNFTs;
    }
}