import {useMoralis} from "react-moralis";
import {useEffect} from "react";
import Link from "next/link";

const Header = () => {
    const {
        enableWeb3,
        account,
        isWeb3Enabled,
        isWeb3EnableLoading,
        Moralis,
        deactivateWeb3,
    } = useMoralis();

    useEffect(() => {
        if (isWeb3Enabled) return;
        if (typeof window !== "undefined") {
            if (window.localStorage.getItem("connected")) {
                enableWeb3();
            }
        }
    }, [isWeb3Enabled]);

    useEffect(() => {
        Moralis.onAccountChanged((account) => {
            if (account == null) {
                window.localStorage.removeItem("connected");
                deactivateWeb3();
            }
        });
    }, []);

    const handleConnect = async () => {
        await enableWeb3();
        if (typeof window !== "undefined") {
            window.localStorage.setItem("connected", "injected");
        }
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
                    {account ? (
                        <p className="text-lg font-semibold text-green-500">
                            Connected: {account.slice(0, 6)}...
                            {account.slice(-4)}
                        </p>
                    ) : (
                        <button
                            onClick={handleConnect}
                            disabled={isWeb3EnableLoading}
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