import {useEffect} from "react";
import {useAccount, useConnect} from "wagmi";
import { injected } from "wagmi/connectors";
import Link from "next/link";

const Header = () => {
    const {address, isConnected} = useAccount();
    const {connect, isPending} = useConnect({
        connector: injected,
    });

    useEffect(() => {
        if (isConnected) return;
        if (
            typeof window !== "undefined" &&
            window.localStorage.getItem("connected")
        ) {
            connect();
        }
    }, [isConnected, connect]);

    useEffect(() => {
        if (isConnected) {
            window.localStorage.setItem("connected", "injected");
        } else {
            window.localStorage.removeItem("connected");
        }
    }, [isConnected]);

    const handleConnect = async () => {
        connect();
    };

    return (
        <header className="bg-gray-800 p-4 shadow-md">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <h1 className="py-4 px-4 font-bold text-3xl text-white">
                        NFT Marketplace
                    </h1>
                    <Link href="/">
                        <a className="text-2xl font-bold text-white hover:text-gray-300">
                            Home
                        </a>
                    </Link>
                    <Link href="/sell">
                        <a className="text-lg font-semibold text-gray-300 hover:text-white">
                            Sell NFT
                        </a>
                    </Link>
                </div>
                <div>
                    {address ? (
                        <p className="text-lg font-semibold text-green-500">
                            Connected: {address.slice(0, 6)}...
                            {address.slice(-4)}
                        </p>
                    ) : (
                        <button
                            onClick={handleConnect}
                            disabled={isPending}
                            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:opacity-50"
                        >
                            Connect Wallet
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;