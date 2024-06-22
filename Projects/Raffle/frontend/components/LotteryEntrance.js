import { useMoralis, useWeb3Contract } from "react-moralis"
import abi from "@constants/abi.json"
import addresses from "@constants/addresses.json"
import { useEffect, useState } from "react"
import ethers from "ethers"

const LotteryEntrance = () => {
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
    const raffleAddress = parseInt(chainIdHex) in addresses ? addresses[parseInt(chainIdHex)][0] : null
    const [entranceFee, setEntranceFee] = useState("0")
    const [numPlayers, setNumPlayers] = useState("0")
    const [recentWinner, setRecentWinner] = useState(null)
    const [notification, setNotification] = useState({})

     const { runContractFunction: getEntranceFee } = useWeb3Contract({
			abi: abi,
			contractAddress: raffleAddress,
			functionName: "getEntranceFee",
			params: {},
     });    
    
    const { runContractFunction: enterRaffle, isLoading, isFetching } = useWeb3Contract({
		abi: abi,
		contractAddress: raffleAddress,
		functionName: "enterRaffle",
		params: {},
		msgValue: entranceFee,
    });    

    const { runContractFunction: getNumPlayers } = useWeb3Contract({
		abi: abi,
		contractAddress: raffleAddress,
		functionName: "getNumPlayers",
		params: {},
    });   
    
    const { runContractFunction: getRecentWinner} = useWeb3Contract({
		abi: abi,
		contractAddress: raffleAddress,
		functionName: "getRecentWinner",
		params: {},
    });    

    const updateInfo = async () => {
		const entranceFee = (await getEntranceFee()).toString();
		const numPlayers = (await getNumPlayers()).toString();
		const recentWinner = await getRecentWinner();
		setEntranceFee(entranceFee);
		setNumPlayers(numPlayers);
		setRecentWinner(recentWinner);
	};

    useEffect(() => {
        if (isWeb3Enabled) {
            updateInfo()
        }
    }, [isWeb3Enabled])


    const handleEnterRaffle = async () => {
        await enterRaffle({
            onSuccess: handleSuccess,
            onError: handleError
        })
    }

    const handleSuccess = async (transaction) => {
        await transaction.wait(1)
        setNotification({
            type: "info",
            message: "Transaction Complete!",
            title: "Transaction Info",
        })
        updateInfo()
    }

    const handleError = () => {
        setNotification({
            type: "error",
            message: "Transaction Failed",
            title: "Transaction Error",
        })
    }

    const handleNotificationClose = () => {
        setNotification(null)
    }

    return (
        <div className="container mx-auto p-4">
            {raffleAddress
                ? (
                <div className="bg-white shadow-md rounded-lg p-6">
                    <button
                        onClick={handleEnterRaffle}
                        disabled={isLoading || isFetching}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:opacity-50"
                    >
                        {isLoading || isFetching ? "Loading..." : "Enter Raffle"}
                    </button>
                    <p className="mt-4">Entrance Fee: {ethers.formatUnits(entranceFee, "ether")} ETH</p>
                    <p>Number of Players: {numPlayers}</p>
                    <p>Recent Winner: {recentWinner}</p>
                </div>
                )
                : (
                <p className="text-red-500">No Raffle Address</p>
            )}

            {notification && (
                <Notification details={notification} onClose={handleNotificationClose} />
            )}
        </div>
    )
    
}

export default LotteryEntrance