import "./globals.css";
import {MoralisProvider} from "react-moralis"

export const metadata = {
  title: "Raffle",
  description: "A completly decentralized autonomous lottery system",
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
