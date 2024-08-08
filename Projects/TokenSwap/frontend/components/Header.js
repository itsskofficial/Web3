import {useEffect} from "react";
import {ConnectButton} from "@rainbow-me/rainbowkit";
import {useAccount} from "wagmi";
import toast, {Toaster} from "react-hot-toast";
import Menu from "./SVG/Menu";
import Logo from "./SVG/Logo";
import TokenBalance from "./TokenBalance";

const Header = () => {
	const {address} = useAccount();
	const notifyConnectWallet = () => {
		toast.error("Connect wallet", {duration: 20000});
	};
	useEffect(() => {
		if (!address) {
			notifyConnectWallet();
		}
	}, [address]);

	return (
		<header className="p-4 text-gray-100">
			<div className="container flex justify-between h-16 mx-auto">
				<div className="flex">
					<a
						rel="noopener noreferrer"
						href="#"
						aria-label="Home"
						className="flex items-center p-2 text-2xl font-bold"
					>
						<Logo />
					</a>
					<ul className="items-stretch hidden space-x-3 lg:flex">
						<li className="flex">
							<a
								rel="noopener noreferrer"
								href="#"
								className="flex items-center px-2 -mb-1 dark:border-transparent text-[#7765F3] border-[#7765F3]"
							>
								Swap
							</a>
						</li>
						<li className="flex">
							<a
								rel="noopener noreferrer"
								href="/transactions"
								className="flex items-center px-2 -mb-1 dark:border-transparent text-[#7765F3] border-[#7765F3]"
							>
								Transactions
							</a>
						</li>
						<li className="flex">
							<a
								rel="noopener noreferrer"
								href="#"
								className="flex items-center px-2 -mb-1 dark:border-transparent text-[#7765F3] border-[#7765F3]"
							>
								NFTs
							</a>
						</li>
						<li className="flex">
							<a
								rel="noopener noreferrer"
								href="#"
								className="flex items-center px-2 -mb-1 dark:border-transparent text-[#7765F3] border-[#7765F3]"
							>
								Pool
							</a>
						</li>
					</ul>
				</div>
				<div className="items-center flex-shrink-0 hidden lg:flex">
					<TokenBalance name={"ETH"} walletAddress={address} />
					<TokenBalance name={"USDC"} walletAddress={address} />
					<ConnectButton />
				</div>
				<button className="p-4 lg:hidden">
					<Menu />
				</button>
			</div>
			<Toaster />
		</header>
	);
};

export default Header;
