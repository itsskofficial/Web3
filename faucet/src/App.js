import {Fragment, useEffect, useState} from 'react'
import classes from './css/App.module.css'
import Web3 from 'web3'
import detectEthereumProvider from '@metamask/detect-provider'

function App() {

  const [web3API,setWeb3API] = useState({
    web3:null,
    provider:null
  })
  
  const [account,setAccount] = useState(null)

  useEffect(() => {

    const loadProvider = async () => {

      const provider = detectEthereumProvider()
      // let provider = null
      // if (window.ethereum){
      //   provider = window.ethereum
      //   try {
      //     await provider.enable()
      //   }
      //   catch {
      //     console.error("User denied account access")
      //   }
      // }

      // else if (window.web3){
      //   provider = window.web3.currentProvider
      //   try {
      //     await provider.request({method:'eth_requestAccounts'})
      //   }
      //   catch {
      //     console.error("User denied account access")
      //   }
      // }
        
      // else if (!process.env.production){
      //   provider = new Web3.providers.HttpProvider("http://localhost:7545")
      //   try {
      //     await provider.enable()
      //   }
      //   catch {
      //     console.error("User denied account access")
      //   }
      // }

      if (provider) {
        setWeb3API({
          web3: new Web3(provider),
          provider:provider
        })
      }
      else {
        console.error("Please install Metamask")
      }
    }

    loadProvider()

  }, [])

  useEffect(() => {
    const getAccount = async () => {
      const accounts = await web3API.web3.eth.getAccounts()
      setAccount(accounts[0])
    }

    getAccount()

  },[web3API])

  
  // const loadAccounts = async () => {
  //   const accounts = await window.ethereum.request({method:'eth_requestAccounts'})
  //   console.log(accounts)
  // }

  return (
    <Fragment>
      <div className={classes.wrapper}>
        <div className={classes.faucet}>
          <div className={classes.account}>
            Account : {account ? account :
              <button className={classes.wallet}>
                Connect Wallet   
            </button>}
          </div>
          <div className={classes.balance}>
            Current balance is <strong>10</strong> ETH
          </div>
          <div className={classes.actions}>
            {/* <button className={classes.ethereum} onClick={loadAccounts}>
              Enable Ethereum
            </button> */}
            <button className={classes.deposit}>
              Deposit
            </button>
            <button className={classes.withdraw}>
              Withdraw
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
