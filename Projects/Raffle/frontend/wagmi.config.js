import { http, createConfig } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";

export const config = createConfig({
	chains: [mainnet, sepolia],
	transports: {
		[mainnet.id]: http(process.env.MAINNET_RPC_URL),
		[sepolia.id]: http(process.env.SEPOLIA_RPC_URL),
	},
});