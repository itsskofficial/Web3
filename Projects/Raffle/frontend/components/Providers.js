"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { config } from "../wagmi.config";

const queryClient = new QueryClient();

const Providers = ({ children }) => (
    <WagmiProvider config={config}>				
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    </WagmiProvider>
);

export default Providers;
