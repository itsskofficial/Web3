const { ethers, deployments, network } = require("hardhat")
const path = require("path"); // Importing the path module to resolve the path to the .env file
require("dotenv").config({ path: path.resolve(__dirname, "../.env") }); // Importing the dotenv module to read the .env file
const fs = require("fs")

const FRONTEND_ADDRESSES_PATH = "../frontend/constants/addresses.json"
const FRONTEND_ABI_PATH = "../frontend/constants/abi.json"

module.exports = async () => {
    if (process.env.UPDATE_FRONTEND === "true") {
        await updateContractInfo()
    }
}

const updateContractInfo = async () => {
    const raffleDeployment = await deployments.get("Raffle")
    const raffle = await ethers.getContractAt(raffleDeployment.abi, raffleDeployment.address)
    const chainId = network.config.chainId.toString()
    const addresses = JSON.parse(fs.readFileSync(FRONTEND_ADDRESSES_PATH, "utf8"))
    const abi = raffle.interface.fragments

    if (chainId in addresses) {
        if (!addresses[chainId].includes(raffle.target)) {
            addresses[chainId].push(raffle.target)
        }
    } else {
        addresses[chainId] = [raffle.target]
    }

    fs.writeFileSync(FRONTEND_ADDRESSES_PATH, JSON.stringify(addresses))
    fs.writeFileSync(FRONTEND_ABI_PATH, JSON.stringify(abi))
}

module.exports.tags = ["all", "frontend"]