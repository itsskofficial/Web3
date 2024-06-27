const {network, deployments, getNamedAccounts} = require("hardhat");
const {developmentChains} = require("../helper-hardhat-config");
const path = require("path"); // Importing the path module to resolve the path to the .env file
require("dotenv").config({path: path.resolve(__dirname, "../.env")}); // Importing the dotenv module to read the .env file
const {verify} = require("../utils/verify");

module.exports = async () => {
    const {deploy, log} = deployments;
    const {deployer} = await getNamedAccounts();

    log("-------------------------");

    const basicNFT = await deploy("BasicNFT", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    });

    log(`BasicNFT deployed at ${basicNFT.address}`);
    log("-------------------------");
    log("Verifying...")

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(basicNFT.address, []);
    }

    log("Verified");
    log("-------------------------");
};

module.exports.tags = ["all", "basicNFT"]