const { assert, expect } = require("chai")
const { network, deployments, ethers, getNamedAccounts } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("NFT Marketplace Unit Tests", () => {
        let nftMarketplace, basicNFT, deployer, player
        const PRICE = ethers.parseEther("0.1")
        const TOKEN_ID = 0

        beforeEach(async () => {
            deployer = (await getNamedAccounts()).deployer
            player = (await getNamedAccounts()).player
            await deployments.fixture(["all"])

            const nftMarketplaceDeployment = await deployments.get("NFTMarketplace")
            nftMarketplace = await ethers.getContractAt(nftMarketplaceDeployment.abi, nftMarketplaceDeployment.address)
            const basicNFTDeployment = await deployments.get("BasicNFT")
            basicNFT = await ethers.getContractAt(basicNFTDeployment.abi, basicNFTDeployment.address)
            await basicNFT.mint()
            await basicNFT.approve(nftMarketplace.target, TOKEN_ID)
        })
    })