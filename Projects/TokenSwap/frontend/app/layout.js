import "@styles/globals.css";

import Providers from "@components/Providers";

export const metadata = {
	title: "Token Swap",
	description: "A completly decentralized token swap system",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<Providers />
			</body>
		</html>
	);
}