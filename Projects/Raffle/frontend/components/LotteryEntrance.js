import { useWeb3Contract } from "react-moralis"
import abi from "@constants/abi.json"
import address from "@constants/address.json"

const LotteryEntrance = () => {
    const { runContractFunction: enterRaffle } = useWeb3Contract({
        abi: abi,
        contractAddress: address,
        functionName: "enterRaffle",
        params: {},
        msgValue: entranceFee
    })    
    
}

export default LotteryEntrance