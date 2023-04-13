import { useEffect, useState } from "react"

const useAccount = (web3) => {
    const { mutate, ...rest } = useSWR(() =>
    web3 ? "web3/accounts" : null,
    async () => {
      const accounts = await web3.eth.getAccounts()
      return accounts[0]
    }
  )

    useEffect(() => {
        web3.provider && web3.provider.on('accountsChanged',
            accounts => setAccount(accounts[0]??null)
            ) 
    }, web3.provider)
    
    return (
     account
    )
}

export default useAccount