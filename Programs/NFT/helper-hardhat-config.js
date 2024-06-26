const networkConfig = {
    11155111: {
        name: "sepolia",
        vrfCoordinatorV2Address: "0x9ddfaca8183c41ad55329bdeed9f6a8d53168b1b",
        gasLane:
            "0x787d74caea10b2b357790d5b5247c2f63d1d91572a9846f780606e4d953677ae",
        subscriptionId:
            "66845934560283432536180671947727435581582947144976014058069151677014042118510",
        callbackGasLimit: "500000",
        mintFee: "100000000000000000",
        ethUsdPriceFeed: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
    },
    31337: {
        name: "localhost",
        gasLane:
            "0x787d74caea10b2b357790d5b5247c2f63d1d91572a9846f780606e4d953677ae",
        callbackGasLimit: "500000",
        mintFee: "100000000000000000",
    },
};

const developmentChains = ["hardhat", "localhost"];
const DECIMALS = 8;
const INITIAL_PRICE = 200000000000;

module.exports = {
    networkConfig,
    developmentChains,
    DECIMALS,
    INITIAL_PRICE
};
