import { useState } from "react"

const useAccount = (web3) => {
    const [account, setAccount] = useState(null)
    
    return(
     web3 ? 'Test' : null
    )
}

export default useAccount