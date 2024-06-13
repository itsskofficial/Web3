require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify")
const path = require("path"); // Importing the path module to resolve the path to the .env file
require("dotenv").config({ path: path.resolve(__dirname, ".env") }); // Importing the dotenv module to read the .env file
require("./tasks/block-number") // Importing the block-number task from tasks/block-number.js

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.24",
    defaultNetwork: "hardhat",
    networks: {
        localhost: {
        url: "http://localhost:8545",
        chainId: 31337
        },
        sepolia: {
            url: process.env.SEPOLIA_RPC_URL,
            accounts: [process.env.METAMASK_PRIVATE_KEY],
            chainId: 11155111,
        },
    },
    etherscan: {
      apiKey: process.env.ETHERSCAN_API_KEY
    }
};
