"use client";

import { useEffect } from "react";
import { useAccount, useConnect } from "wagmi";
import { injected } from "wagmi/connectors";

const Header = () => {
	const { address, isConnected } = useAccount();
	const { connect, isPending } = useConnect();

	useEffect(() => {
		if (isConnected) return;
		if (
			typeof window !== "undefined" &&
			window.localStorage.getItem("connected")
		) {
			connect({connector: injected()});
		}
	}, [isConnected, connect]);

	useEffect(() => {
		if (isConnected) {
			window.localStorage.setItem("connected", "injected");
		} else {
			window.localStorage.removeItem("connected");
		}
	}, [isConnected]);

	const handleConnect = () => {
		connect({connector: injected()});
	};

	return (
		<div className="flex items-center justify-center h-screen">
			{address ? (
				<p className="text-lg font-semibold text-green-500">
					Connected: {address}
				</p>
			) : (
				<button
					onClick={handleConnect}
					disabled={isPending}
					className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-700 disabled:opacity-50"
				>
					Connect Wallet
				</button>
			)}
		</div>
	);
};

export default Header;
