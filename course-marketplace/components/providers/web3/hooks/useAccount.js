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

    useEffect(() => {
        web3.provider && web3.provider.on('accountsChanged',
            accounts => setAccount(account[0]??null)
            ) 
    })
    
    return (
     account
    )
}

export default useAccount