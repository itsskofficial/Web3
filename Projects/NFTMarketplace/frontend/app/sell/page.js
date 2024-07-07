"use client";

import { useEffect, useState } from "react";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { ethers } from "ethers";
import nftAbi from "@constants/BasicNFT.json";
import nftMarketplaceAbi from "@constants/NFTMarketplace.json";
import addresses from "@constants/addresses.json";
import Header from "@components/Header";
import Notification from "@components/Notification";

const Sell = () => {
    const [nftAddress, setNftAddress] = useState("");
    const [tokenId, setTokenId] = useState("");
    const [price, setPrice] = useState("");
    const [proceeds, setProceeds] = useState("0");
    const [notificationDetails, setNotificationDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(false)

    const { address: account, chainId, isConnected } = useAccount();
    const chainString = chainId ? chainId.toString() : null;
    const marketplaceAddress = chainId
        ? addresses[chainString].NFTMarketplace[0]
        : null;

    const { data: proceedsData, refetch: refetchProceeds } = useReadContract({
        abi: nftMarketplaceAbi,
        address: marketplaceAddress,
        functionName: "getProceeds",
        args: [account],
    });

    const { writeContract } = useWriteContract();

    const updateInfo = async () => {
        await Promise.all([refetchProceeds()]);
    };

    useEffect(() => {
        updateInfo();
    }, [isConnected]);

    useEffect(() => {
        if (proceedsData) {
            setProceeds(proceedsData.toString());
        }
    }, [proceedsData]);

    const listItem = () => {
        setIsLoading(true)
        writeContract({
            abi: nftMarketplaceAbi,
            address: marketplaceAddress,
            functionName: "listItem",
            args: [nftAddress, tokenId, ethers.parseUnits(price, "ether")],
            onSuccess: handleApproveAndListSuccess,
            onError: handleError,
        });
    };

    const approveItem = () => {
        setIsLoading(true)
        writeContract({
            abi: nftAbi,
            address: nftAddress,
            functionName: "approve",
            args: [marketplaceAddress, tokenId],
            onSuccess: listItem,
            onError: handleError,
        });
    };

    const withdrawProceeds = () => {
        setIsLoading(true)
        writeContract({
            abi: nftMarketplaceAbi,
            address: marketplaceAddress,
            functionName: "withdrawProceeds",
            onSuccess: handleWithdrawSuccess,
            onError: handleError,
        });
    };

    const handleApproveAndListSuccess = async (transaction) => {
        await transaction.wait(1);
        setNotificationDetails({
            type: "success",
            message: "Listing created - please refresh (and move blocks)",
            title: "Listing Created",
        });
        setIsLoading(false)
    };

    const handleWithdrawSuccess = async (transaction) => {
        await transaction.wait(1);
        setNotificationDetails({
            type: "success",
            message: "Withdrawals initiated - please refresh (and move blocks)",
            title: "Withdrawals Initiated",
        });
        refetchProceeds();
        setIsLoading(false)
    };

    const handleError = (error) => {
        setNotificationDetails({
            type: "error",
            message: error.message || "Transaction Failed",
            title: "Transaction Error",
        });
        setIsLoading(false)
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        approveItem();
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
                            isLoading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        disabled={isLoading}
                    >
                        {isLoading ? "Processing..." : "Submit"}
                    </button>
                </div>
            </form>
            <div className="max-w-lg mx-auto p-6 bg-white rounded shadow-md text-center">
                <div className="text-xl font-semibold mb-4">
                    Withdraw {ethers.formatUnits(proceeds, "ether")} proceeds
                </div>
                {proceeds !== "0" ? (
                    <button
                        onClick={withdrawProceeds}
                        className={`px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-700 transition ${
                            isLoading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        disabled={isLoading}
                    >
                        {isLoading ? "Withdrawing..." : "Withdraw"}
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