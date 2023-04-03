import {Fragment} from 'react'
import classes from './css/App.module.css'

function App() {
  return (
    <Fragment>
      <div className={classes.wrapper}>
        <div className={classes.faucet}>
          <div className={classes.balance}>
            Current balance is <strong>10</strong> ETH
          </div>
          <div className={classes.actions}>
            <button className={classes.deposit}>
              Deposit
            </button>
            <button>
              Withdraw
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
