import { http, createConfig } from "wagmi";
import { mainnet, sepolia, localhost } from "wagmi/chains";

export const config = createConfig({
	chains: [mainnet, sepolia, localhost],
	transports: {
		[mainnet.id]: http(process.env.MAINNET_RPC_URL),
		[sepolia.id]: http(process.env.SEPOLIA_RPC_URL),
	},
});