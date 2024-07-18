// SPDX-License-Identifier: MIT
pragma solidity >=0.6.12 <0.9.0;

import "./CustomToken.sol";

error CustomDex__InsufficientFunds();

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

     function createTransaction(string memory tokenA, string memory tokenB, uint256 inputValue, uint256 outputValue) internal {
        transactionIndex++;
        uint256 id = transactionIndex;
        Transaction storage transaction = transactionHistory[id];
        transaction.id = id;
        transaction.tokenA = tokenA;
        transaction.tokenB = tokenB;
        transaction.inputValue = inputValue;
        transaction.outputValue = outputValue;
        transaction.user = msg.sender;
        transactionHistory[id] = transaction;
    }

    function swapEthToToken(string memory tokenSymbol) public payable returns (uint256) {
        uint256 inputValue = msg.value;
        uint256 outputValue = (inputValue / ethValue) * 1000000000000000000;
        require(tokenToInstance[tokenSymbol].transfer(msg.sender, outputValue), "Transfer failed");

        string memory etherTokenSymbol = "ETH";
        createTransaction(tokenSymbol, etherTokenSymbol, inputValue, outputValue);
        return outputValue;
    }

    function swapTokenToEth(string memory tokenSymbol, uint256 amount) public returns (uint256) {
        uint256 inputValue = amount / 1000000000000000000;
        uint256 outputValue = inputValue * ethValue;

        if (address(this).balance >= outputValue) {
            revert CustomDex__InsufficientFunds();
        }

        payable(msg.sender).transfer(outputValue);
        require(tokenToInstance[tokenSymbol].transferFrom(msg.sender, address(this), amount), "Transfer failed");

        string memory ethTokenSymbol = "ETH";
        createTransaction(tokenSymbol, ethTokenSymbol, inputValue, outputValue);
        return outputValue;
    }

    function swapTokenToToken(string memory tokenA, string memory tokenB, uint256 amount) public {
        require(tokenToInstance[tokenA].transferFrom(msg.sender, address(this), amount), "Transfer failed");
        require(tokenToInstance[tokenB].transfer(msg.sender, amount), "Transfer failed");

        createTransaction(tokenA, tokenB, amount, amount);
    }

    function getTokenBalance(string memory tokenSymbol, address user) public view returns (uint256) {
            return tokenToInstance[tokenSymbol].balanceOf(user);
    }

    function getTokenSupply(string memory tokenSymbol) public view returns (uint256) {
        return tokenToInstance[tokenSymbol].totalSupply();
    }

    function getTokenName(string memory tokenSymbol) public view returns (string memory) {
        return tokenToInstance[tokenSymbol].name();
    }

    function getTokenAddress(string memory tokenSymbol) public view returns (address) {
        return address(tokenToInstance[tokenSymbol]);
    }

    function getEthBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function getTransactionHistory() public view returns (Transaction[] memory) {
        uint256 totalTransactions = transactionIndex;
        Transaction[] memory transactions = new Transaction[](totalTransactions);
        for (uint256 i = 0; i < totalTransactions; i++) {
            transactions[i] = transactionHistory[i];
        }
        return transactions;
    }
}