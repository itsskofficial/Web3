import {Fragment} from 'react'
import classes from './css/App.module.css'

function App() {

  useEffect(())
  const loadProvider = async () => {
    const accounts = await window.ethereum.request({method:'eth_requestAccounts'})
    console.log(accounts)
  }
  return (
    <Fragment>
      <div className={classes.wrapper}>
        <div className={classes.faucet}>
          <div className={classes.balance}>
            Current balance is <strong>10</strong> ETH
          </div>
          <div className={classes.actions}>
            <button className={classes.ethereum} onClick={loadProvider}>
              Enable Ethereum
            </button>
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
