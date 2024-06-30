import {WagmiProvider} from "wagmi";
import {config} from "../wagmi.config";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import "@styles/globals.css";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const queryClient = new QueryClient();

export const metadata = {
    title: "NFT Marketplace",
    description: "A completly decentralized autonomous NFT marketplace",
};

const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "https://api.studio.thegraph.com/query/81185/nft-marketplace/v0.0.2",
});

export default function RootLayout({children}) {
    return (
        <html lang="en">
            <body>
                <WagmiProvider config={config}>
                    <QueryClientProvider client={queryClient}>
                        <ApolloProvider client={apolloClient}>
                            {children}
                        </ApolloProvider>
                    </QueryClientProvider>
                </WagmiProvider>
            </body>
        </html>
    );
}
