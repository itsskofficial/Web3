import { useMoralis } from "react-moralis";
import { useEffect } from "react";

const Header = () => {
    const { enableWeb3, account, isWeb3Enabled, isWeb3EnableLoading, Moralis, deactivateWeb3 } = useMoralis();

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
        <div className="flex items-center justify-center h-screen">
            {account ? (
                <p className="text-lg font-semibold text-green-500">
                    Connected: {account}
                </p>
            ) : (
                <button
                    onClick={handleConnect}
                    disabled={isWeb3EnableLoading}
                    className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                    Connect Wallet
                </button>
            )}
        </div>
    );
};

export default Header;