"use client"

import { useEffect, useState } from "react";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { ethers } from "ethers";
import nftAbi from "../constants/BasicNFT.json";
import nftMarketplaceAbi from "../constants/NFTMarketplace.json";
import addresses from "../constants/addresses.json";
import Header from "../components/Header";
import Notification from "../components/Notification";

const Sell = () => {
    const [nftAddress, setNftAddress] = useState("");
    const [tokenId, setTokenId] = useState("");
    const [price, setPrice] = useState("");
    const [proceeds, setProceeds] = useState("0");
    const [loading, setLoading] = useState(false);
    const [notificationDetails, setNotificationDetails] = useState(null);

    const { address: account, isConnected } = useAccount();
    const chainId = "31337"; // Change this according to your setup
    const marketplaceAddress = addresses[chainId].NFTMarketplace[0];

    const { data: proceedsData, refetch: refetchProceeds } = useReadContract({
        abi: nftMarketplaceAbi,
        address: marketplaceAddress,
        functionName: "getProceeds",
        args: [account],
    });

    const { write: approveWrite, isLoading: approveLoading } = useWriteContract({
        abi: nftAbi,
        address: nftAddress,
        functionName: "approve",
        args: [marketplaceAddress, tokenId],
        onSuccess: (transaction) => listItem(transaction),
        onError: (error) => {
            console.log(error);
            setNotificationDetails({
                type: "error",
                message: error.message || "Approval failed",
                title: "Approval Error",
            });
        },
    });

    const { write: listWrite, isLoading: listLoading } = useWriteContract({
        abi: nftMarketplaceAbi,
        address: marketplaceAddress,
        functionName: "listItem",
        args: [nftAddress, tokenId, ethers.utils.parseUnits(price, "ether")],
        onSuccess: handleApproveAndListSuccess,
        onError: (error) => {
            console.log(error);
            setNotificationDetails({
                type: "error",
                message: error.message || "Listing failed",
                title: "Listing Error",
            });
        },
    });

    const { write: withdrawWrite, isLoading: withdrawLoading } = useWriteContract({
        abi: nftMarketplaceAbi,
        address: marketplaceAddress,
        functionName: "withdrawProceeds",
        onSuccess: handleWithdrawSuccess,
        onError: (error) => {
            console.log(error);
            setNotificationDetails({
                type: "error",
                message: error.message || "Withdrawal failed",
                title: "Withdrawal Error",
            });
        },
    });

    useEffect(() => {
        if (proceedsData) {
            setProceeds(proceedsData.toString());
        }
    }, [proceedsData]);

    const listItem = async (transaction) => {
        await transaction.wait(1);
        listWrite();
    };

    const handleApproveAndListSuccess = async (transaction) => {
        await transaction.wait(1);
        setNotificationDetails({
            type: "success",
            message: "Listing created - please refresh (and move blocks)",
            title: "Listing Created",
        });
    };

    const handleWithdrawSuccess = async (transaction) => {
        await transaction.wait(1);
        setNotificationDetails({
            type: "success",
            message: "Withdrawals initiated - please refresh (and move blocks)",
            title: "Withdrawals Initiated",
        });
        refetchProceeds();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        approveWrite();
    };

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
                        className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 ${
                            approveLoading || listLoading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        disabled={approveLoading || listLoading}
                    >
                        {approveLoading || listLoading ? "Processing..." : "Submit"}
                    </button>
                </div>
            </form>
            <div className="max-w-lg mx-auto p-6 bg-white rounded shadow-md text-center">
                <div className="text-xl font-semibold mb-4">
                    Withdraw {ethers.utils.formatUnits(proceeds, "ether")} proceeds
                </div>
                {proceeds !== "0" ? (
                    <button
                        onClick={() => withdrawWrite()}
                        className={`px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-700 transition ${
                            withdrawLoading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        disabled={withdrawLoading}
                    >
                        {withdrawLoading ? "Withdrawing..." : "Withdraw"}
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
};

export default Sell;