import { useEffect, useState } from "react"

const useAccount = (web3) => {
    const [account, setAccount] = useState(null)
    useEffect(() => {
        const accounts = await web3.eth.getAccounts()
        setAccount(accounts[0])
    }, [web3])
    
    return(
     web3 ? 'Test' : null
    )
}

export default useAccount