import { useEffect, useState } from "react"

const useAccount = (web3) => {
    const [account, setAccount] = useState(null)
    useEffect(() => {
        const getAccounts = async () => {
            const accounts = await web3.eth.getAccounts()
            setAccount(accounts[0])
        }

        web3 && getAccounts()
    }, [web3])
    
    return (
     account
    )
}

export default useAccount