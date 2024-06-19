const { getNamedAccounts, deployments, network } = require("hardhat")
const { developmentChains, networkConfig } = require("../helper-hardhat-config")

module.exports = async () => {
    const { deployer } = await getNamedAccounts()
    const { deploy, log } = deployments
    const chainId = network.config.chainId
    let vrfCoordinatorV2Address, entranceFee, gasLane, subscriptionId

    if (developmentChains.includes(network.name)) {
        const vrfCoordinatorV2Mock = await deployments.get("VRFCoordinatorV2Mock")

        vrfCoordinatorV2Address = vrfCoordinatorV2Mock.address
    } else {
        vrfCoordinatorV2Address = networkConfig[chainId]["vrfCoordinatorV2"]
    }

    entranceFee = networkConfig[chainId]["entranceFee"]
    gasLane = networkConfig[chainId]["gasLane"]
    subscriptionId = networkConfig[chainId]["subscriptionId"]

    const raffle = await deploy("Raffle", {
        from: deployer,
        args: [
            vrfCoordinatorV2Address,
            entranceFee,
            gasLane,
            subscriptionId
        ],
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1
    })
}