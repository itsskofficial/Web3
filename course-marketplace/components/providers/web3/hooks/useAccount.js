import { useEffect, useState } from "react"

const useAccount = (web3) => {
    const [account, setAccount] = useState(null)
    useEffect(async () => {
        account = await web3.eth.getAccounts()
        
    })
    return(
     web3 ? 'Test' : null
    )
}

export default useAccount