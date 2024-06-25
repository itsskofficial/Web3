// SPDX-License-Identifier: MIT
pragma solidity >=0.6.12 <0.9.0;

contract Encoding {
    function combineStrings() public pure returns (string memory) {
        string memory a = "Hello";
        string memory b = "World";
        string memory c = abi.encodePacked(a, b).toString();
        return c;
    }

    function encodeNumber() public pure returns (bytes memory) {
        bytes memory number = abi.encode(1);
        return number;
    }

    function encodeString() public pure returns(bytes memory) {
        bytes memory someString = abi.encode("Hello World!");
        return someString;
    }

    function encodeStringPacked() public pure returns (bytes memory) {
        bytes memory someString = abi.encodePacked("Hello World!");
        return someString;
    }

    function encodeStringBytes() public pure returns (bytes memory) {
        bytes memory someString = bytes("Hellow World!");
        return someString;
    }

    function decodeString() public pure returns (string memory) {
        string memory someString = abi.decode(bytes(abi.encode("Hello World!")), string);
        return someString;
    }

    function multiEncode() public pure returns (bytes memory) {
        bytes memory encoded = abi.encode(1, "Hello World!", "0x1234");
        return encoded;
    }

    function multiDecode() public pure returns (uint, string memory, bytes memory) {
        (uint a, string memory b, bytes memory c) = abi.decode(abi.encode(1, "Hello World!", "0x1234"), (uint, string, bytes));
        return (a, b, c);
    }

    function multiStringCastPacked() public pure returns (string memory) {
        string memory a = "Hello";
        string memory b = "World";
        string memory c = string(abi.encodePacked(a, b));
        return c;
    }
}