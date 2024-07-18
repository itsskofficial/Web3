"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { config } from "../config";
import {ApolloProvider, ApolloClient, InMemoryCache} from "@apollo/client";

const queryClient = new QueryClient();

const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "https://api.studio.thegraph.com/query/81185/nft-marketplace/v0.0.2",
});

const Providers = ({children}) => (
    <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
            <ApolloProvider client={apolloClient}>
                {children}
            </ApolloProvider>
        </QueryClientProvider>
    </WagmiProvider>
);

export default Providers;