import React from "react";
import Button from "./Button";

const Marketplace = ({ icos, shortenAddress, setBuyIco, setOpenBuyToken, currency }) => {
  const notifySuccess = (msg) => toast.success(msg, {duration: 200});
  const notifyError = (msg) => toast.error(msg, {duration: 200});

  const copy = (text) => {
		navigator.clipboard.writeText(text);
		notifySuccess("Copied successfully");
  };
  
  return (
    <>
      <h2>
        All ICOs
      </h2>
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Symbol</th>
              <th>Balance</th>
              <th>Address</th>
              <th>Creator</th>
              <th>Buy</th>
            </tr>
          </thead>
          <tbody>
            {allIcos.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.symbol}</td>
                <td>{item.balance}</td>
                <td onClick={() => copy(token.address)}>
                  {shortenAddress(token.address)}
                </td>
                <td onClick={() => copy(token.creator)}>
                  {shortenAddress(token.creator)}
                </td>
                <td>{item.price} {currency}</td>
                <td onClick={() => (setBuyIco(item), setOpenBuyToken(true))}>
                  <Button name="Buy" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Marketplace;
