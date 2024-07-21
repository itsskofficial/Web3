import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "Raffle",
  description: "A completly decentralized autonomous lottery system",
};

export default function RootLayout({ children }) {
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