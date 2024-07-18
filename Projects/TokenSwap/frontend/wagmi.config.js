import { http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";

export const config = getDefaultConfig({
	appName: "TokenSwap",
	projectId: "1.0.0",
	chains: [mainnet, sepolia],
	transports: {
		[mainnet.id]: http(process.env.MAINNET_RPC_URL),
		[sepolia.id]: http(process.env.SEPOLIA_RPC_URL),
	},
});