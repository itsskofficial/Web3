import Header from "@components/Header";
import "@styles/globals.css";
import {MoralisProvider} from "react-moralis"
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

export const metadata = {
  title: "NFT Marketplace",
  description: "A completly decentralized autonomous NFT marketplace",
};

const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "https://api.studio.thegraph.com/query/81185/nft-marketplace/v0.0.2",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <body>
            <MoralisProvider initializeOnMount={false}>
                <ApolloProvider client={client}>
                    {children}
                </ApolloProvider>
            </MoralisProvider>
        </body>
      </html>  
  );
}
