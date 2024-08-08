import { useState } from "react";
import Button from "./Button";
import Input from "./Input";

const CreateICO = ({ setOpenIcoCreator, connectWallet, address, createTokenIco }) => {
  
  const [icoSale, setIcoSale] = useState({
    address: "",
    price: 0
  })

  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <span onClick={() => setOpenIcoCreator(false)} className="close">
          &times;
        </span>
        <h2 style={{ marginBottom: "1rem" }}>
          Create ICO
        </h2>
        <div className="input-container">
          <Input placeholder="Address" handleChange={(e) => setIcoSale({ ...icoSale, address: e.target.value })} />
          <Input placeholder="Price" handleChange={(e) => setIcoSale({ ...icoSale, price: parseFloat(e.target.value) })} />
        </div>
        <div className="button-box" style={{ marginTop: "1rem" }}>
          {
            address ? (
              <Button name="Create Ico" handleClick={() => createTokenIco(icoSale)} />
            ) : (
              <Button
                name="Connect Wallet"
                  handleClick={() => connectWallet()}
                />
            )
          } 
        </div>
      </div>
    </div>
  )
};

export default CreateICO;
