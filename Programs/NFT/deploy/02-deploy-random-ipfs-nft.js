const { network, deployments, getNamedAccounts } = require("hardhat");
const { networkConfig, developmentChains } = require("../helper-hardhat-config");
const path = require("path"); // Importing the path module to resolve the path to the .env file
require("dotenv").config({path: path.resolve(__dirname, "../.env")}); // Importing the dotenv module to read the .env file
const { verify } = require("../utils/verify");
const { uploadImages, storeTokenURIMetadata } = require("../utils/uploadToPinata");

const VRF_SUBSCRIPTION_FUND_AMOUNT = ethers.parseEther("5");
const IMAGES_DIR = "./images";
const METADATA_TEMPLATE = {
    name: "",
    description: "",
    image: "",
    attributes: [
        {
            trait_type: "Dangerous",
            value: "0",
        },
    ],
}

const handleTokenURIs = async () => {
    let tokenURIs = [];
    const { responses, files } = await uploadImages(IMAGES_DIR);
    for (responseIndex in responses) {
        let tokenURIMetada = { ...METADATA_TEMPLATE }
        tokenURIMetada.name = files[responseIndex].replace(".png", "");
        tokenURIMetada.description = `An NFT for ${tokenURIMetada.name}`
        tokenURIMetada.image = `ipfs://${responses[responseIndex].IpfsHash}`;

        console.log(`Uploading ${tokenURIMetada.name} metadata...`);
        const metadataUploadResponse = await storeTokenURIMetadata(tokenURIMetada);
        tokenURIs.push(`ipfs://${metadataUploadResponse.IpfsHash}`);
    }

    return tokenURIs
}


module.exports = async () => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId = network.config.chainId;

    let vrfCoordinatorV2Address, subscriptionId, dogTokenURIs;

    if (process.env.UPLOAD_TO_PINATA == "true") {
        console.log("Uploading to Pinata...");

        dogTokenURIs = await handleTokenURIs()
    }

    if (developmentChains.includes(network.name)) {
        const vrfCoordinatorV2Mockdeployment = await deployments.get(
            "VRFCoordinatorV2Mock"
        )
        const vrfCoordinatorV2Mock = await ethers.getContractAt(
            vrfCoordinatorV2Mockdeployment.abi,
            vrfCoordinatorV2Mockdeployment.address
        )

        vrfCoordinatorV2Address = vrfCoordinatorV2Mock.target

        const transactionResponse = await vrfCoordinatorV2Mock.createSubscription()
        const transactionReceipt = await transactionResponse.wait(1)

        subscriptionId = BigInt(transactionReceipt.logs[0].topics[1]);
        await vrfCoordinatorV2Mock.fundSubscription(subscriptionId, VRF_SUBSCRIPTION_FUND_AMOUNT)
    } else {
        vrfCoordinatorV2Address = networkConfig[chainId]["vrfCoordinatorV2Address"]
        subscriptionId = networkConfig[chainId]["subscriptionId"]
    }

    gasLane = networkConfig[chainId]["gasLane"];
    callbackGasLimit = networkConfig[chainId]["callbackGasLimit"];
    mintFee = networkConfig[chainId]["mintFee"];

    log("Deploying Random IPFS NFT...");

    const randomIPFSNFT = await deploy("RandomIPFSNFT", {
        from: deployer,
        args: [
            vrfCoordinatorV2Address,
            gasLane,
            subscriptionId,
            callbackGasLimit,
            mintFee,
            dogTokenURIs
        ],
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    });

    log(`Random IPFS NFT deployed at ${randomIPFSNFT.address}`);

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(randomIPFSNFT.address, []);
    }

    log("-------------------------");
}

module.exports.tags = ["all", "randomIPFSNFT"]