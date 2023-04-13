import detectEthereumProvider from "@metamask/detect-provider"
import { createContext, useContext, useState } from "react"

const Web3Context = createContext(null)

export default function Web3Provider({ children }) {
    const [web3API, setWeb3API] = useState({
        provider:null,
        web3:null,
        initialized: false,
        contract:null
    })
    const provider = detectEthereumProvider()

    if (provider){
        set
    }
    

  return (
    <Web3Context.Provider value={{test: "Hello"}}>
      {children}
    </Web3Context.Provider>
  )
}

export function useWeb3() {
  return useContext(Web3Context)
}
