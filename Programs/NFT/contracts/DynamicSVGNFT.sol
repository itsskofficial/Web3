// SPDX-License-Identifier: MIT
pragma solidity >=0.6.12 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "base64-sol/Base64.sol";

contract DynamicSVGNFT is ERC721 {

    uint256 public s_tokenCounter;
    string private immutable i_happySVG;
    string private immutable i_frownSVG;
    string private constant base64EncodedPrefix = "data:image/svg+xml;base64"

    constructor(string memory happySVG, string memory frownSVG) ERC721("DynamicSVGNFT", "DSN") {
        s_tokenCounter = 0;

    }

    function svgToImageURI public pure returns (string memory) {
        string memory svgBase64Encoded = Base64.encode(bytes(string(abi.encodePacked(svg))))
        return string(abi.encodePacked(base64EncodedPrefix, svgBase64Encoded))
    }

    function mint() public {
        _safeMint(msg.sender, totalSupply());
        s_tokenCounter += 1;
    }
}