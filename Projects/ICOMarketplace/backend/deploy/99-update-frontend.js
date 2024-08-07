const {ethers, deployments, network} = require("hardhat");
const path = require("path");
require("dotenv").config({path: path.resolve(__dirname, "../.env")});
const fs = require("fs");

const FRONTEND_ADDRESSES_PATH = "../frontend/constants/addresses.json";
const FRONTEND_ABI_PATH = "../frontend/constants/";
const FRONTEND_BYTECODES_PATH = "../frontend/constants/bytecodes.json";

module.exports = async () => {
    if (process.env.UPDATE_FRONTEND === "true") {
        console.log("Updating front end...");
        await updateContractInfo();
        console.log("Front end updated!");
    }
};

const updateContractInfo = async () => {
    const icoMarketplaceDeployment = await deployments.get("ICOMarketplace");
    const icoMarketplace = await ethers.getContractAt(
        icoMarketplaceDeployment.abi,
        icoMarketplaceDeployment.address
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

    // Ensure both contract addresses are stored
    if (!(chainId in addresses)) {
        addresses[chainId] = {};
    }

    if (!addresses[chainId]["ICOMarketplace"]) {
        addresses[chainId]["ICOMarketplace"] = [];
    }

    if (
        !addresses[chainId]["ICOMarketplace"].includes(icoMarketplace.address)
    ) {
        addresses[chainId]["ICOMarketplace"].push(icoMarketplace.address);
    }

    if (!addresses[chainId]["CustomToken"]) {
        addresses[chainId]["CustomToken"] = [];
    }

    if (!addresses[chainId]["CustomToken"].includes(customToken.address)) {
        addresses[chainId]["CustomToken"].push(customToken.address);
    }

    fs.writeFileSync(
        FRONTEND_ADDRESSES_PATH,
        JSON.stringify(addresses, null, 2)
    );

    // Update ABIs
    const icoMarketplaceAbi = icoMarketplace.interface.fragments;
    const customTokenAbi = customToken.interface.fragments;

    fs.writeFileSync(
        `${FRONTEND_ABI_PATH}ICOMarketplace.json`,
        JSON.stringify(icoMarketplaceAbi, null, 2)
    );

    fs.writeFileSync(
        `${FRONTEND_ABI_PATH}CustomToken.json`,
        JSON.stringify(customTokenAbi, null, 2)
    );

    // Update Bytecodes
    const bytecodes = {};

    bytecodes["ICOMarketplace"] = icoMarketplaceDeployment.bytecode;
    bytecodes["CustomToken"] = customTokenDeployment.bytecode;

    fs.writeFileSync(
        FRONTEND_BYTECODES_PATH,
        JSON.stringify(bytecodes, null, 2)
    );
};

module.exports.tags = ["all", "frontend"];