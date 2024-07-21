import "@styles/globals.css";
import Providers from "./providers";

export const metadata = {
    title: "NFT Marketplace",
    description: "A completly decentralized autonomous NFT marketplace",
};

export default function RootLayout({children}) {
    return (
        <html lang="en">
            <body>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
