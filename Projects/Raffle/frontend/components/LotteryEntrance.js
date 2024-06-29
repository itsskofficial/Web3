import { useEffect, useState } from "react";
import { ethers } from "ethers";
import {
	useAccount,
	useReadContract,
	useWriteContract,
} from "wagmi";
import abi from "@constants/abi.json";
import addresses from "@constants/addresses.json";
import Notification from "@components/Notification";

const LotteryEntrance = () => {
	const { isConnected, chainId } = useAccount();
	const raffleAddress = chainId.toString() in addresses ? addresses[chainId][0] : null;
	const [entranceFee, setEntranceFee] = useState("0");
	const [numPlayers, setNumPlayers] = useState("0");
	const [recentWinner, setRecentWinner] = useState(null);
    const [notification, setNotification] = useState(null);
    
    const { writeContract } = useWriteContract();

	const { data: entranceFeeData, refetch: refetchEntranceFee } =
		useReadContract({
			address: raffleAddress,
			abi: abi,
			functionName: "getEntranceFee",
			enabled: isConnected,
		});

	const { data: numPlayersData, refetch: refetchNumPlayers } =
		useReadContract({
			address: raffleAddress,
			abi: abi,
			functionName: "getNumPlayers",
			enabled: isConnected,
		});

	const { data: recentWinnerData, refetch: refetchRecentWinner } =
		useReadContract({
			address: raffleAddress,
			abi: abi,
			functionName: "getRecentWinner",
			enabled: isConnected,
        });

	const updateInfo = async () => {
		await Promise.all([
			refetchEntranceFee(),
			refetchNumPlayers(),
			refetchRecentWinner(),
		]);
	};

	useEffect(() => {
		if (isConnected) {
			updateInfo();
		}
	}, [isConnected]);

	useEffect(() => {
		if (entranceFeeData) setEntranceFee(entranceFeeData.toString());
		if (numPlayersData) setNumPlayers(numPlayersData.toString());
		if (recentWinnerData) setRecentWinner(recentWinnerData);
	}, [entranceFeeData, numPlayersData, recentWinnerData]);

	const handleEnterRaffle = async () => {
		writeContract({
			abi: abi,
			address: raffleAddress,
			functionName: "enterRaffle",
			args: [],
			overrides: {
				value: entranceFee,
			},
			onSuccess: handleSuccess,
			onError: handleError,
		});
	};

	const handleSuccess = async (transaction) => {
		await transaction.wait(1);
		setNotification({
			type: "info",
			message: "Transaction Complete!",
			title: "Transaction Info",
		});
		updateInfo();
	};

	const handleError = (error) => {
		setNotification({
			type: "error",
			message: error.message || "Transaction Failed",
			title: "Transaction Error",
		});
	};

	const handleNotificationClose = () => {
		setNotification(null);
	};

	return (
		<div className="container mx-auto p-4">
			{raffleAddress ? (
				<div className="bg-white shadow-md rounded-lg p-6">
					<button
						onClick={handleEnterRaffle}
						disabled={isLoading || isFetching}
						className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:opacity-50"
					>
						{isLoading || isFetching
							? "Loading..."
							: "Enter Raffle"}
					</button>
					<p className="mt-4">
						Entrance Fee:{" "}
						{ethers.utils.formatUnits(entranceFee, "ether")} ETH
					</p>
					<p>Number of Players: {numPlayers}</p>
					<p>Recent Winner: {recentWinner}</p>
				</div>
			) : (
				<p className="text-red-500">No Raffle Address</p>
			)}

			{notification && (
				<Notification
					details={notification}
					onClose={handleNotificationClose}
				/>
			)}
		</div>
	);
};

export default LotteryEntrance;