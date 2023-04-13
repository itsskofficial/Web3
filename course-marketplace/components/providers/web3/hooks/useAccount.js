import { useEffect, useState } from "react"

const useAccount = (web3) => {
    const [account, setAccount] = useState(null)
    useEffect(() => {
        account = await web3.web3AP
    })
    return(
     web3 ? 'Test' : null
    )
}

export default useAccount