import {Fragment} from "react"

function App() {
  return (
    <Fragment>
      <div className={classes.wrapper}>
        <div className={classes.faucet}>
          <div className={classes.balance}>
            Current balance is <strong>10</strong>
          </div>
        </div>

      </div>
    </Fragment>
  );
}

export default App;
