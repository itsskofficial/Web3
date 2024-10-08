import "@styles/globals.css";

import Providers from "./providers";

export const metadata = {
	title: "Token Swap",
	description: "A completely decentralized token swap system",
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