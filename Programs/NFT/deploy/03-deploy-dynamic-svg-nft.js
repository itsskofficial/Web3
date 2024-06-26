const { network, deployments, getNamedAccounts } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const path = require("path"); // Importing the path module to resolve the path to the .env file
require("dotenv").config({ path: path.resolve(__dirname, "../.env") }); // Importing the dotenv module to read the .env file
const { verify } = require("../utils/verify")
const fs = require("fs")

module.exports = async () => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    log("-------------------------")
    const { chainId, blockConfirmations } = network.config

    let ethUsdPriceFeedAddress

    if (developmentChains.includes(network.name)) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }

    const frownSVG = fs.readFileSync("./images/frown.svg", { encoding: "utf-8" })
    const highSVG = fs.readFileSync("./images/happy.svg", { encoding: "utf-8" })

    log("Deploying DynamicSVGNFT...")
    
    const dynamicSVGNFT = await deploy("DynamicSVGNFT", {
        from: deployer,
        args: [ethUsdPriceFeedAddress, frownSVG, highSVG],
        log: true,
        waitConfirmations: blockConfirmations || 1,
    })

    log(`DynamicSVGNFT deployed at ${dynamicSVGNFT.address}`)

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        await verify(dynamicSVGNFT.address, [ethUsdPriceFeedAddress, frownSVG, highSVG])
    }

    log("-------------------------")
}

module.exports.tags = ["all", "dynamicSVGNFT"]