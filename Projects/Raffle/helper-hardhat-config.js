const { ethers } = require("hardhat");

const networkConfig = {
    11155111: {
        name: "sepolia",
        vrfCoordinatorV2: "0x9ddfaca8183c41ad55329bdeed9f6a8d53168b1b",
        entranceFee: ethers.parseEther("0.01"),
        gasLane:
            "0x787d74caea10b2b357790d5b5247c2f63d1d91572a9846f780606e4d953677ae",
        subscriptionId: "0",
        callbackGasLimit: "500000",
    },
    31337: {
        name: "localhost",
        entranceFee: ethers.parseEther("0.01"),
        gasLane:
            "0x787d74caea10b2b357790d5b5247c2f63d1d91572a9846f780606e4d953677ae",
        callbackGasLimit: "500000",
    },
};

const developmentChains = ["hardhat", "localhost"];

module.exports = {
    networkConfig,
    developmentChains,
};
