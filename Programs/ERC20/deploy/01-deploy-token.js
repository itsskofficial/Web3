const { network } = require("hardhat");
const {
	developmentChains,
	INITIAL_SUPPLY,
} = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
	const { deploy, log } = deployments;
	const { deployer } = await getNamedAccounts();
	const token = await deploy("Token", {
		from: deployer,
		args: [INITIAL_SUPPLY],
		log: true,
		// we need to wait if on a live network so we can verify properly
		waitConfirmations: network.config.blockConfirmations || 1,
	});
	log(`Token deployed at ${token.address}`);

	if (
		!developmentChains.includes(network.name) &&
		process.env.ETHERSCAN_API_KEY
	) {
		await verify(token.address, [INITIAL_SUPPLY]);
	}
};

module.exports.tags = ["all", "token"];