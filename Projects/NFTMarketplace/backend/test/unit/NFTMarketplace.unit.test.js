const { assert, expect } = require("chai")
const { network, deployments, ethers, getNamedAccounts } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("NFT Marketplace Unit Tests", () => {
        let nftMarketplace, basicNFT, deployer, player
        const PRICE = ethers.parseEther("0.1")
        const NEW_PRICE = ethers.parseEther("0.2")
        const TOKEN_ID = 0

        beforeEach(async () => {
            deployer = (await getNamedAccounts()).deployer
            await deployments.fixture(["all"])
            const accounts = await ethers.getSigners()
            player = accounts[1]
            const nftMarketplaceDeployment = await deployments.get("NFTMarketplace")
            nftMarketplace = await ethers.getContractAt(nftMarketplaceDeployment.abi, nftMarketplaceDeployment.address)
            const basicNFTDeployment = await deployments.get("BasicNFT")
            basicNFT = await ethers.getContractAt(basicNFTDeployment.abi, basicNFTDeployment.address)
            await basicNFT.mint()
            await basicNFT.approve(nftMarketplace.target, TOKEN_ID)
        })

        it("lists and can be bought", async () => {
            await nftMarketplace.listItem(basicNFT.target, TOKEN_ID, PRICE)
            const playerNFT = nftMarketplace.connect(player)
            await playerNFT.buyItem(basicNFT.target, TOKEN_ID, { value: PRICE })
            const newOwner = await basicNFT.ownerOf(TOKEN_ID)
            assert.equal(newOwner.toString(), player.address)
            const deployerProceeds = await nftMarketplace.getProceeds(deployer)
            assert.equal(deployerProceeds.toString(), PRICE.toString())
        })

        it("reverts if not owner tries to list", async () => {
            const playerNFT = nftMarketplace.connect(player)
            await expect(
                playerNFT.listItem(basicNFT.target, TOKEN_ID, PRICE)
            ).to.be.revertedWithCustomError(nftMarketplace, "NFTMarketplace__NotOwner")
        })

        it("reverts if price is zero", async () => {
            await expect(
                nftMarketplace.listItem(basicNFT.target, TOKEN_ID, 0)
            ).to.be.revertedWithCustomError(nftMarketplace, "NFTMarketplace__PriceMustBeAboveZero")
        })

        it("reverts if already listed", async () => {
            await nftMarketplace.listItem(basicNFT.target, TOKEN_ID, PRICE)
            await expect(
                nftMarketplace.listItem(basicNFT.target, TOKEN_ID, PRICE)
            ).to.be.revertedWithCustomError(nftMarketplace, "NFTMarketplace__AlreadyListed")
        })

        it("allows updating listing price", async () => {
            await nftMarketplace.listItem(basicNFT.target, TOKEN_ID, PRICE)
            await nftMarketplace.updateListing(basicNFT.target, TOKEN_ID, NEW_PRICE)
            const listing = await nftMarketplace.getListing(basicNFT.target, TOKEN_ID)
            assert.equal(listing.price.toString(), NEW_PRICE.toString())
        })

        it("reverts update if not owner", async () => {
            await nftMarketplace.listItem(basicNFT.target, TOKEN_ID, PRICE)
            const playerNFT = nftMarketplace.connect(player)
            await expect(
                playerNFT.updateListing(basicNFT.target, TOKEN_ID, NEW_PRICE)
            ).to.be.revertedWithCustomError(nftMarketplace, "NFTMarketplace__NotOwner")
        })

        it("allows canceling listing", async () => {
            await nftMarketplace.listItem(basicNFT.target, TOKEN_ID, PRICE)
            await nftMarketplace.cancelListing(basicNFT.target, TOKEN_ID)
            const listing = await nftMarketplace.getListing(basicNFT.target, TOKEN_ID)
            assert.equal(listing.price.toString(), "0")
        })

        it("reverts cancel if not owner", async () => {
            await nftMarketplace.listItem(basicNFT.target, TOKEN_ID, PRICE)
            const playerNFT = nftMarketplace.connect(player)
            await expect(
                playerNFT.cancelListing(basicNFT.target, TOKEN_ID)
            ).to.be.revertedWithCustomError(nftMarketplace, "NFTMarketplace__NotOwner")
        })

        it("reverts if not listed", async () => {
            await expect(
                nftMarketplace.buyItem(basicNFT.target, TOKEN_ID)
            ).to.be.revertedWithCustomError(nftMarketplace, "NFTMarketplace__NotListed")
        })

        it("reverts if price not met", async () => {
            await nftMarketplace.listItem(basicNFT.target, TOKEN_ID, PRICE)
            const playerNFT = nftMarketplace.connect(player)
            await expect(
                playerNFT.buyItem(basicNFT.target, TOKEN_ID, { value: ethers.parseEther("0.05") })
            ).to.be.revertedWithCustomError(nftMarketplace, "NFTMarketplace__PriceNotMet")
        })

        it("allows withdrawing proceeds", async () => {
            await nftMarketplace.listItem(basicNFT.target, TOKEN_ID, PRICE)
            const playerNFT = nftMarketplace.connect(player)
            await playerNFT.buyItem(basicNFT.target, TOKEN_ID, { value: PRICE })
            const deployerProceedsBefore = await nftMarketplace.getProceeds(deployer)
            assert.equal(deployerProceedsBefore.toString(), PRICE.toString())
            await nftMarketplace.withdrawProceeds()
            const deployerProceedsAfter = await nftMarketplace.getProceeds(deployer)
            assert.equal(deployerProceedsAfter.toString(), "0")
        })

        it("reverts if no proceeds to withdraw", async () => {
            await expect(
                nftMarketplace.withdrawProceeds()
            ).to.be.revertedWithCustomError(nftMarketplace, "NFTMarketplace__NoProceedsToWithdraw")
        })
    })