// SPDX-License-Identifier: MIT
pragma solidity >=0.6.12 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";
import "base64-sol/Base64.sol";

contract DynamicSVGNFT is ERC721 {

    uint256 public s_tokenCounter;
    string private immutable i_happySVGURI;
    string private immutable i_frownSVGURI;
    string private constant base64EncodedSVGPrefix = "data:image/svg+xml;base64"
    string private constant base64EncodedJSONPrefix = "data:application/json;base64"
    AggregatorV3Interface internal immutable i_priceFeed;
    mapping(uint256 => int256) public s_tokenIdToThreshold;

    event NFTCreated(uint256 indexed tokenId, int256 threshold, string tokenURI);

    constructor(address priceFeedAddress, string memory happySVG, string memory frownSVG) ERC721("DynamicSVGNFT", "DSN") {
        s_tokenCounter = 0;
        i_happySVGURI = svgToImageURI(happySVG);
        i_frownSVGURI = svgToImageURI(frownSVG);
        i_priceFeed = AggregatorV3Interface(priceFeedAddress);
    }

    function svgToImageURI public pure returns (string memory) {
        string memory svgBase64Encoded = Base64.encode(bytes(string(abi.encodePacked(svg))))
        return string(abi.encodePacked(base64EncodedSVGPrefix, svgBase64Encoded))
    }

    function mint(int256 threshold) public {
        s_tokenIdToThreshold[s_tokenCounter] = threshold;
        _safeMint(msg.sender, totalSupply());
        emit NFTCreated(s_tokenCounter, threshold);
        s_tokenCounter += 1;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        (, int256 price,,,) = i_priceFeed.latestRoundData();
        string memory imageURI = price > s_tokenIdToThreshold[tokenId] ? i_happySVGURI : i_frownSVGURI;

        encodedTokenURI = string(
            abi.encodePacked(
            base64EncodedJSONPrefix, Base64.encode(
                bytes(
                    abi.encodePacked(
                        '{"name":"',
                        name(),
                        '", "description":"An NFT that changes based on the Chainlink Feed", ',
                        '"attributes": [{"trait_type": "coolness", "value": 100}], "image":"',
                        imageURI,
                        '"}')
                    )
                )
            )
        );

        return encodedTokenURI               
    }
}