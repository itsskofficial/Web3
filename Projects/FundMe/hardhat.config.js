require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
const path = require("path"); // Importing the path module to resolve the path to the .env file
require("dotenv").config({path: path.resolve(__dirname, ".env")}); // Importing the dotenv module to read the .env file
require("@nomicfoundation/hardhat-ignition-ethers")

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.24",
    defaultNetwork: "hardhat",
    networks: {
        localhost: {
            url: "http://localhost:8545",
            chainId: 31337,
        },
        sepolia: {
            url: process.env.SEPOLIA_RPC_URL || "null",
            accounts: [process.env.METAMASK_PRIVATE_KEY || "null"],
            chainId: 11155111,
        },
    },
    etherscan: {
        apiKey: process.env.ETHERSCAN_API_KEY || "null",
    },
    gasReporter: {
        enabled: true,
        outputFile: "gas-report.txt",
        noColors: true,
        currency: "USD",
        coinmarketcap: process.env.COINMARKETCAP_API_KEY || "null",
        token: "ETH",
    },
};