import {Fragment, useEffect, useState} from 'react'
import classes from './css/App.module.css'
import Web3 from 'web3'
import detectEthereumProvider from '@metamask/detect-provider'
import loadContract from './utils/loadContract'

function App() {

  const [web3API,setWeb3API] = useState({
    web3:null,
    provider:null
  })
  
  const [account,setAccount] = useState(null)

  useEffect(() => {

    const loadProvider = async () => {

      const provider = await detectEthereumProvider()
      const contract = loadContract(Fa)
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

  return (
    <Fragment>
      <div className={classes.wrapper}>
        <div className={classes.faucet}>
          <div className={classes.account}>
            Account : {account ? account :
              <button className={classes.wallet} onClick={() => {
                web3API.provider.request({method:'eth_requestAccounts'})
              }}>
                Connect Wallet   
            </button>}
          </div>
          <div className={classes.balance}>
            Current balance is <strong>10</strong> ETH
          </div>
          <div className={classes.actions}>
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
