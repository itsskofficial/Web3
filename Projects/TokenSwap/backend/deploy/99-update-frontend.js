const {ethers, deployments, network} = require("hardhat");
const path = require("path");
require("dotenv").config({path: path.resolve(__dirname, "../.env")});
const fs = require("fs");

const FRONTEND_ADDRESSES_PATH = "../frontend/constants/addresses.json";
const FRONTEND_ABI_PATH = "../frontend/constants/";

module.exports = async () => {
    if (process.env.UPDATE_FRONTEND === "true") {
        console.log("Updating front end...");
        await updateContractInfo();
        console.log("Front end updated!");
    }
};

const updateContractInfo = async () => {
    const customDexDeployment = await deployments.get("CustomDex");
    const customDex = await ethers.getContractAt(
        customDexDeployment.abi,
        customDexDeployment.address
    );

    const customTokenDeployment = await deployments.get("CustomToken");
    const customToken = await ethers.getContractAt(
        customTokenDeployment.abi,
        customTokenDeployment.address
    );

    const chainId = network.config.chainId.toString();
    const addresses = JSON.parse(
        fs.readFileSync(FRONTEND_ADDRESSES_PATH, "utf8")
    );

     if (chainId in addresses) {
        if (!addresses[chainId]["CustomDex"].includes(customDex.target)) {
            addresses[chainId]["CustomDex"].push(customDex.target)
        }
    } else {
        addresses[chainId] = { CustomDex: [customDex.target] }

    fs.writeFileSync(
        FRONTEND_ADDRESSES_PATH,
        JSON.stringify(addresses)
    );

    const customDexAbi = customDex.interface.fragments
    const customTokenAbi = customToken.interface.fragments

    fs.writeFileSync(
        `${FRONTEND_ABI_PATH}CustomDex.json`,
        JSON.stringify(customDexAbi)
    );

    fs.writeFileSync(
        `${FRONTEND_ABI_PATH}CustomToken.json`,
        JSON.stringify(customTokenAbi)
    );
    }
};

module.exports.tags = ["all", "frontend"];