import {Fragment, useCallback, useEffect, useState} from 'react'
import classes from './css/App.module.css'
import Web3 from 'web3'
import detectEthereumProvider from '@metamask/detect-provider'
import loadContract from './utils/loadContract'

function App() {

  const [web3API,setWeb3API] = useState({
    web3:null,
    provider:null,
    contract: null,
    isProviderLoaded: false
  })
  
  const [account, setAccount] = useState(null)
  const [balance, setBalance] = useState(null)
  const [updateBalance, setUpdateBalance] = useState(false)
  
  const networkConnected = account && web3API.contract

  const toggleUpdateBalance = useCallback(() => {
    setUpdateBalance(!updateBalance)
  }, [updateBalance])
  
  const changeAccountListener = (provider) => {
    // provider.on('accountsChanged', accounts => setAccount(accounts[0]))
    // provider._jsonRpcConnection.events.on('notification', (payload) => {
    //   const { method } = payload
    //   if (method === 'metamask_unlockStateChanged') {
    //     setAccount(null)
    //   }
    // })

    provider.on('accountsChanged', _ => window.location.reload())
  }

  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider()
      const contract = await loadContract('Faucet', provider)

      if (provider) {
        changeAccountListener(provider)
        setWeb3API({
          web3: new Web3(provider),
          provider: provider,
          contract: contract,
          isProviderLoaded: true
        })
      }
      else {
        setWeb3API((web3API) => {
          return {
            ...web3API,
          isProviderLoaded: true
          }
    })
        console.error("Metamask is specifically used for this application. So please install Metamask")
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

  const addFunds = useCallback(async () => {
    const { contract, web3 } = web3API
    await contract.addFunds({
      from: account,
      value: web3.utils.toWei('1', 'ether')
    })
    toggleUpdateBalance()
  }, [web3API, account, toggleUpdateBalance])

  const withdraw = useCallback(async () => {
    const { contract, web3 } = web3API
    const amount = web3.utils.toWei('1', 'ether')
    await contract.withdraw(amount,{
      from: account,
    })

    toggleUpdateBalance()
  },[web3API,account, toggleUpdateBalance])

  return (
    <Fragment>
      <div className={classes.wrapper}>
        <div className={classes.faucet}>
          <div className={classes.account}>
            {web3API.isProviderLoaded ? 
            <div>
            Account : {account ? account :
              !web3API.provider ?
                <div className={classes.wallet}>
                  Wallet Not Connected
                  <a href='https://docs.metamask.io'>
                    Install Metamask
                  </a>
                </div> :
              <button className={classes.wallet} onClick={() => {
                web3API.provider.request({method:'eth_requestAccounts'})
              }}>
                Connect Wallet   
            </button>}
              </div> :
              <span>
                Looking for Web3 provider...
              </span>
            }
          </div>
          <div className={classes.balance}>
            Current balance is <strong>{balance}</strong> ETH
          </div>
          <div className={classes.actions}>
            <button className={classes.deposit} onClick={addFunds} disabled={!account || !networkConnected}>
              Deposit
            </button>
            <button className={classes.withdraw} onClick={withdraw} disabled={!account}>
              Withdraw
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;