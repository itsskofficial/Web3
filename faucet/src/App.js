import {Fragment, useCallback, useEffect, useState} from 'react'
import classes from './css/App.module.css'
import Web3 from 'web3'
import detectEthereumProvider from '@metamask/detect-provider'
import loadContract from './utils/loadContract'

function App() {

  const [web3API,setWeb3API] = useState({
    web3:null,
    provider:null,
    contract:null
  })
  
  const [account, setAccount] = useState(null)
  const [balance, setBalance] = useState(null)
  const [updateBalance, setUpdateBalance] = useState(false)

  const toggleUpdateBalance = useCallback(() => {
    setUpdateBalance(!updateBalance)
  },[updateBalance])

  useEffect(() => {
      const loadProvider = async () => {
      const provider = await detectEthereumProvider()
      const contract = await loadContract('Faucet', provider)

      if (provider) {
        setWeb3API({
          web3: new Web3(provider),
          provider: provider,
          contract: contract
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

  useEffect(() => {
    const loadBalance = async () => {
      const {contract, web3} = web3API
      const balance = await web3.eth.getBalance(contract.address)
      setBalance(web3.utils.fromWei(balance, 'ether'))
    }

    web3API.contract && loadBalance()
  }, [web3API, updateBalance])

  const addFunds = useCallback(() => {
    const { contract, web3 } = web3API
    contract.addFunds({
      from: account,
      value: web3.utils.toWei('1', 'ether')
    })
    toggleUpdateBalance()
  }, [web3API, account, toggleUpdateBalance])

  const withdraw = useCallback(() => {
    const { contract, web3 } = web3API
    await contract.withdraw({
      from: account,
      value:web3.utils.toWei('1', 'ether')
    })

    toggleUpdateBalance()
  },[web3API,account, toggleUpdateBalance])

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
            Current balance is <strong>{balance}</strong> ETH
          </div>
          <div className={classes.actions}>
            <button className={classes.deposit} onClick={addFunds}>
              Deposit
            </button>
            <button className={classes.withdraw} onClick={withdraw}>
              Withdraw
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;