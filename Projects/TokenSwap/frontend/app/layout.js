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
import merge from "lodash/merge";

const { chains, provider } = configureChains(
	[chain.localhost, chain.sepolia],
	[
		alchemyRpcUrls()
	]
)

const { connectors } = getDefaultWallets({
	appName: "Custom Dex",
	chains
})

const wagmiClient = createClient({
	autoConnect: true,
	connectors,
	provider
})

const theme = merge(midnightTheme(), {
	colors: {
		accentColor: "#18181b",
		accentColorForeground: "#ffffff"
	}
})

export const metadata = {
	title: "NFT Marketplace",
	description: "A completly decentralized autonomous NFT marketplace",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<WagmiConfig client={wagmiClient} >
					<RainbowKitProvider chains={chains} theme={theme}>
						{children}
					</RainbowKitProvider>
				</WagmiConfig>
			</body>
		</html>
	);
}