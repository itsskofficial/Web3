import Header from "@components/Header";
import "@styles/globals.css";
import {MoralisProvider} from "react-moralis"

export const metadata = {
  title: "NFT Marketplace",
  description: "A completly decentralized autonomous NFT marketplace",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
          <body>
              <MoralisProvider initializeOnMount={false}>
                  {children}
              </MoralisProvider>
          </body>
      </html>  
  );
}
