const { ethers, deployments, network } = require("hardhat");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
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

    const chainId = network.config.chainId.toString();
    const addresses = JSON.parse(
        fs.readFileSync(FRONTEND_ADDRESSES_PATH, "utf8")
    );

    if (chainId in addresses) {
        if (!addresses[chainId]["CustomDex"].includes(customDex.address)) {
            addresses[chainId]["CustomDex"].push(customDex.address);
        }
    } else {
        addresses[chainId] = {
            CustomDex: [customDex.address]
        };
    }

    fs.writeFileSync(
        FRONTEND_ADDRESSES_PATH,
        JSON.stringify(addresses, null, 2)
    );

    const customDexAbi = customDex.interface.fragments;
    fs.writeFileSync(
        `${FRONTEND_ABI_PATH}CustomDex.json`,
        JSON.stringify(customDexAbi, null, 2)
    );

    // Update the CustomToken ABI
    const customTokenAbi = getAbi("CustomToken");
    fs.writeFileSync(
        `${FRONTEND_ABI_PATH}CustomToken.json`,
        JSON.stringify(customTokenAbi, null, 2)
    );
};

const getAbi = (contractName) => {
    const artifactsPath = path.join(__dirname, '..', 'artifacts', 'contracts', `${contractName}.sol`, `${contractName}.json`);
    const artifact = JSON.parse(fs.readFileSync(artifactsPath, 'utf8'));
    return artifact.abi;
};

module.exports.tags = ["all", "frontend"];