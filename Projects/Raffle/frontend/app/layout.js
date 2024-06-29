import "./globals.css";
import { WagmiProvider } from "wagmi";
import { config } from "../wagmi.config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const metadata = {
  title: "Raffle",
  description: "A completly decentralized autonomous lottery system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <body>
              <WagmiProvider config={config}>
                  <QueryClientProvider client={queryClient}>
                      {children}
                  </QueryClientProvider>
            </WagmiProvider>
        </body>
    </html>  
  );
}
