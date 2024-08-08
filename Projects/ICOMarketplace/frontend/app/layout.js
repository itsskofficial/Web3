import "@styles/globals.css";

import Providers from "./providers";

export const metadata = {
	title: "ICO Marketplace",
	description: "A completely decentralized ICO marketplace",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}