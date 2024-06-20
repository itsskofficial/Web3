const { getNamedAccounts, deployments, network, ethers } = require("hardhat")
const { developmentChains, networkConfig } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

const VRF_SUBSCRIPTION_FUND_AMOUNT = ethers.parseEther("5")

module.exports = async () => {
    const { deployer } = await getNamedAccounts()
    const { deploy, log } = deployments
    const chainId = network.config.chainId
    let vrfCoordinatorV2Address, entranceFee, gasLane, subscriptionId, callbackGasLimit, interval

    if (developmentChains.includes(network.name)) {
        const vrfCoordinatorV2MockDeployment = await deployments.get("VRFCoordinatorV2Mock")
        const vrfCoordinatorV2Mock = await ethers.getContractAt(vrfCoordinatorV2MockDeployment.abi, vrfCoordinatorV2MockDeployment.address)
        let transactionResponse, transactionReceipt

        vrfCoordinatorV2Address = vrfCoordinatorV2Mock.target
        transactionResponse = await vrfCoordinatorV2Mock.createSubscription()
        transactionReceipt = await transactionResponse.wait()
        subscriptionId = BigInt(transactionReceipt.logs[0].topics[1]);

        await vrfCoordinatorV2Mock.fundSubscription(subscriptionId, VRF_SUBSCRIPTION_FUND_AMOUNT)
    } else {
        vrfCoordinatorV2Address = networkConfig[chainId]["vrfCoordinatorV2"]
        subscriptionId = networkConfig[chainId]["subscriptionId"]
    }

    entranceFee = networkConfig[chainId]["entranceFee"]
    gasLane = networkConfig[chainId]["gasLane"]
    callbackGasLimit = networkConfig[chainId]["callbackGasLimit"]
    interval = networkConfig[chainId]["interval"]

    log("Deploying Raffle...")

    const raffle = await deploy("Raffle", {
        from: deployer,
        args: [
            vrfCoordinatorV2Address,
            entranceFee,
            gasLane,
            subscriptionId,
            callbackGasLimit,
            interval
        ],
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1
    })

    log("Raffle deployed!")
    log("-------------------")

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        await verify(raffle.address, [
            vrfCoordinatorV2Address,
            entranceFee,
            gasLane,
            subscriptionId,
            callbackGasLimit,
            interval
        ])
    }
}

module.exports.tags = ["all", "raffle"]