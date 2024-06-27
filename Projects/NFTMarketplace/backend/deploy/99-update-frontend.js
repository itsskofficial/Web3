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
    const nftMarketplaceDeployment = await deployments.get("NFTMarketplace");
    const nftMarketplace = await ethers.getContractAt(
        nftMarketplaceDeployment.abi,
        nftMarketplaceDeployment.address
    );

    const basicNFTDeployment = await deployments.get("BasicNFT");
    const basicNFT = await ethers.getContractAt(
        basicNFTDeployment.abi,
        basicNFTDeployment.address
    );

    const chainId = network.config.chainId.toString();
    const addresses = JSON.parse(
        fs.readFileSync(FRONTEND_ADDRESSES_PATH, "utf8")
    );

     if (chainId in addresses) {
        if (!addresses[chainId]["NFTMarketplace"].includes(nftMarketplace.target)) {
            addresses[chainId]["NFTMarketplace"].push(nftMarketplace.target)
        }
    } else {
        addresses[chainId] = { NFTMarketplace: [nftMarketplace.target] }

    fs.writeFileSync(
        FRONTEND_ADDRESSES_PATH,
        JSON.stringify(addresses)
    );

    // Update ABIs
    const nftMarketplaceAbi = nftMarketplace.interface.fragments
    const basicNFTAbi = basicNFT.interface.fragments

    fs.writeFileSync(
        `${FRONTEND_ABI_PATH}NFTMarketplace.json`,
        JSON.stringify(nftMarketplaceAbi)
    );

    fs.writeFileSync(
        `${FRONTEND_ABI_PATH}BasicNFT.json`,
        JSON.stringify(basicNFTAbi)
    );
    }
};

module.exports.tags = ["all", "frontend"];