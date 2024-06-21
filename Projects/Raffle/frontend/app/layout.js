import { Inter } from "next/font/google";
import "./globals.css";
import {MoralisProvider} from "react-moralis"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Raffle",
  description: "A completly decentralized autonomous lottery system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
          <body className={inter.className}>
              <MoralisProvider initializeOnMount={false}>
                  {children}
              </MoralisProvider>
          </body>
      </html>  
  );
}
