const { ethers, network, deployments } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")

module.exports = async () => {
    const {log } = deployments
    let mintTransaction, mintTransactionReceipt

    log("Minting...")
    log("-------------------------")

    const basicNFTDeployment = await deployments.get("BasicNFT")
    const basicNFT = await ethers.getContractAt(basicNFTDeployment.abi, basicNFTDeployment.address)

    mintTransaction = await basicNFT.mint()
    await mintTransaction.wait(1)
    console.log("Basic NFT index 0 has tokenURI: ", await basicNFT.tokenURI(0))

    const randomIPFSNFTDeployment = await deployments.get("RandomIPFSNFT")
    const randomIPFSNFT = await ethers.getContractAt(randomIPFSNFTDeployment.abi, randomIPFSNFTDeployment.address)
    const mintFee = await randomIPFSNFT.getMintFee()

    await new Promise(async (resolve, reject) => {
        setTimeout(resolve, 300000)
        randomIPFSNFT.once("NFTMinted", async () => {
            resolve()
        })

        mintTransaction = await randomIPFSNFT.requestNFT({ value: mintFee.toString() })
        mintTransactionReceipt = await mintTransaction.wait(1)
        if (developmentChains.includes(network.name)) {
            const requestId = mintTransactionReceipt.logs[0].topics[1].toSting()
            const vrfCoordinatorV2MockDeployment = await deployments.get("VRFCoordinatorV2Mock")
            const vrfCoordinatorV2Mock = await ethers.getContractAt(vrfCoordinatorV2MockDeployment.abi, vrfCoordinatorV2MockDeployment.address)
            await vrfCoordinatorV2Mock.fulfillRandomWords(requestId, randomIPFSNFT.target)
        }
    })

    console.log("Random IPFS NFT index 0 tokenURI: ", await randomIPFSNFT.tokenURI(0))

    const threshold = ethers.parseEther("4000")
    const dynamicSVGNFTDeployment = await deployments.get("DynamicSVGNFT")
    const dynamicSVGNFT = await ethers.getContractAt(dynamicSVGNFTDeployment.abi, dynamicSVGNFTDeployment.address)

    mintTransaction = await dynamicSVGNFT.mint(threshold)
    await mintTransaction.wait(1)
    console.log("Dynamic SVG NFT index 0 tokenURI: ", await dynamicSVGNFT.tokenURI(0))
}

module.exports.tags = ["all", "mint"]