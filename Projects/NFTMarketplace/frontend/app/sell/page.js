import { useMoralis, useWeb3Contract } from "react-moralis"
import { ethers } from "ethers"
import nftAbi from "@constants/BasicNFT.json"
import nftMarketplaceAbi from "@constants/NFTMarketplace.json"
import addresses from "@constants/addresses.json"
import { useEffect, useState } from "react"
import Header from "@components/Header"
import Notification from "@components/Notification"

const Sell = () => {
    const [nftAddress, setNftAddress] = useState("");
    const [tokenId, setTokenId] = useState("");
    const [price, setPrice] = useState("");
    const [proceeds, setProceeds] = useState("0")
    const [loading, setLoading] = useState(false);
    const [notificationDetails, setNotificationDetails] = useState(null);

    const { chainId, account, isWeb3Enabled } = useMoralis()
    const chainString = chainId ? parseInt(chainId).toString() : "31337"
    const marketplaceAddress = addresses[chainString].NFTMarketplace[0]

    const { runContractFunction } = useWeb3Contract()

    const approveItem = async () => {
        const approveOptions = {
            abi: nftAbi,
            contractAddress: nftAddress,
            functionName: "approve",
            params: {
                to: marketplaceAddress,
                tokenId: tokenId,
            },
        };

        await runContractFunction({
            params: approveOptions,
            onSuccess: (transaction) => listItem(transaction, nftAddress, tokenId, price),
            onError: (error) => {
                console.log(error);
            },
        });
    }

    const listItem = async (transaction, nftAddress, tokenId, price) => {
        await transaction.wait(1)
        const listOptions = {
            abi: nftMarketplaceAbi,
            contractAddress: marketplaceAddress,
            functionName: "listItem",
            params: {
                nftAddress: nftAddress,
                tokenId: tokenId,
                price: price,
            },
        }

        await runContractFunction({
            params: listOptions,
            onSuccess: handleApproveAndListSuccess,
            onError: (error) => console.log(error),
        })
    }

    const handleApproveAndListSuccess = async (transaction) => {
        await transaction.wait(1)
        setNotificationDetails({
            type: "success",
            message: "Listing created - please refresh (and move blocks)",
            title: "Listing Created",
        });
    }

    const handleWithdraw = async () => {
        setLoading(true);
        await runContractFunction({
            params: {
                abi: nftMarketplaceAbi,
                contractAddress: marketplaceAddress,
                functionName: "withdrawProceeds",
                params: {},
            },
            onError: (error) => {
                console.error(error);
                setLoading(false);
            },
            onSuccess: (transaction) => {
                handleWithdrawSuccess(transaction);
                setLoading(false);
            },
        });
    };

    const handleWithdrawSuccess = async (transaction) => {
        await transaction.wait(1)
        setNotificationDetails({
            type: "success",
            message: "Withdrawals initiated - please refresh (and move blocks)",
            title: "Withdrawals Initiated",
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await approveItem();
    };

    const updateInfo = async () => {
        const returnedProceeds = await runContractFunction({
            params: {
                abi: nftMarketplaceAbi,
                contractAddress: marketplaceAddress,
                functionName: "getProceeds",
                params: {
                    seller: account,
                },
            },
            onError: (error) => console.log(error),
        });
        if (returnedProceeds) {
            setProceeds(returnedProceeds.toString());
        }
    }

     useEffect(() => {
         updateInfo();
     }, [proceeds, account, isWeb3Enabled, chainId])

    return (
        <>
            <Header />
            <form
                onSubmit={handleSubmit}
                className="max-w-lg mx-auto p-6 bg-white rounded shadow-md"
            >
                <h2 className="text-2xl font-bold mb-4">Sell your NFT!</h2>

                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="nftAddress"
                    >
                        NFT Address
                    </label>
                    <input
                        type="text"
                        id="nftAddress"
                        value={nftAddress}
                        onChange={(e) => setNftAddress(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="tokenId"
                    >
                        Token ID
                    </label>
                    <input
                        type="number"
                        id="tokenId"
                        value={tokenId}
                        onChange={(e) => setTokenId(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="price"
                    >
                        Price (in ETH)
                    </label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Submit
                    </button>
                </div>
            </form>
            <div className="max-w-lg mx-auto p-6 bg-white rounded shadow-md text-center">
                <div className="text-xl font-semibold mb-4">
                    Withdraw {ethers.formatUnits(proceeds, "ether")} proceeds
                </div>
                {proceeds !== "0" ? (
                    <button
                        onClick={handleWithdraw}
                        className={`px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-700 transition ${
                            loading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        disabled={loading}
                    >
                        {loading ? "Withdrawing..." : "Withdraw"}
                    </button>
                ) : (
                    <div className="text-red-500">No proceeds detected</div>
                )}
            </div>
            {notificationDetails && (
            <Notification
                details={notificationDetails}
                onClose={() => setNotificationDetails(null)}
            />
            )}
        </>
    );
}

export default Sell