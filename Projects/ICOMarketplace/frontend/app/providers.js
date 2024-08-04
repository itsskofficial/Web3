"use client"

import "@rainbow-me/rainbowkit/styles.css";

import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { RainbowKitProvider, midnightTheme } from "@rainbow-me/rainbowkit";
import {NextUIProvider} from "@nextui-org/react";
import {WagmiProvider} from "wagmi";
import {config} from "../wagmi.config";
import merge from "lodash/merge";
import { StateContextProvider } from "../constants";
import toast, {Toaster} from "react-hot-toast"

const queryClient = new QueryClient();

const theme = merge(midnightTheme(), {
	colors: {
		accentColor: "#18181b",
		accentColorForeground: "#ffffff",
	},
});

const Providers = ({children}) => {
	return (
		<WagmiProvider config={config}>
			<QueryClientProvider client={queryClient}>
                <RainbowKitProvider theme={theme}>
					<NextUIProvider>
						<StateContextProvider>
							<Toaster />
							{children}
						</StateContextProvider>
                    </NextUIProvider>
				</RainbowKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	);
};

export default Providers;
