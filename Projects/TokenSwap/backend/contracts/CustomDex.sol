// SPDX-License-Identifier: MIT
pragma solidity >=0.6.12 <0.9.0;

import "./CustomToken.sol";

contract CustomDex {
    string[] public tokenNames = ["Tether USD", "Binance Coin", "USD Coin", "Tron", "Matic", "Ethereum", "Bitcoin", "Polkadot"];
    string[] public tokenSymbols = ["USDT", "BNB", "USDC", "TRX", "MATIC", "ETH", "BTC", "DOT"];
    mapping (string => ERC20) public tokenToInstance;
    uint256 ethValue = 1000000000000000000;

    struct Transaction {
        uint256 id;
        string tokenA;
        string tokenB;
        uint256 inputValue;
        uint256 outputValue;
        address user;
    }

    uint256 public transactionIndex;
    mapping (uint256 => Transaction) private transactionHistory;

    constructor() {
        for (uint256 i = 0; i < tokenNames.length; i++) {
            CustomToken token = new CustomToken(tokenNames[i], tokenSymbols[i]);
            tokenToInstance[tokenSymbols[i]] = token;
        }
    }

    function getBalance(string memory tokenSymbol, address user) public view returns (uint256) {
            return tokenToInstance[tokenSymbol].balanceOf(user);
    }

    function getTotalSupply(string memory tokenSymbol) public view returns (uint256) {
        return tokenToInstance[tokenSymbol].totalSupply();
    }

    function getTokenName(string memory tokenSymbol) public view returns (string memory) {
        return tokenToInstance[tokenSymbol].name();
    }

    function getTokenAddress(string memory tokenSymbol) public view returns (address) {
        return address(tokenToInstance[tokenSymbol]);
    }

}