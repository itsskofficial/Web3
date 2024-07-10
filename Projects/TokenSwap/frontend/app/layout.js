import "@styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css"

import {
	chain,
	configureChains,
	createClient,
	WagmiConfig,
	alchemyRpcUrls,
} from "wagmi";
import { getDefaultWallets, RainbowKitProvider, darkTheme, midnightTheme } from "@rainbow-me/rainbowkit";

const { chains, provider } = configureChains(
	[chain.localhost, chain.sepolia],
	[
		alchemyRpcUrls()
	]
)

export const metadata = {
	title: "NFT Marketplace",
	description: "A completly decentralized autonomous NFT marketplace",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}