import { useState } from "react";
import UploadLogo from "./UploadLogo";
import Input from "./Input";
import Button from "./Button";

const TokenCreator = ({
  createToken, setOpenTokenCreator, address, connectWallet, setLoader
}) => {

  const [imageURL, setImageURL] = useState("")
  const [token, setToken] = useState({
    name: "",
    symbol: "",
    supply: 0
  })

  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <span onClick={() => setOpenTokenCreator(false)} className="close">
          &times;
        </span>
        <h2 style={{ marginBottom: "1rem" }}>
          Create Token
        </h2>
        <UploadLogo 
          imageURL = {imageURL}
          setImageURL={setImageURL}
          setLoader={setLoader}
        />
        <div className="input-container">
          <Input placeholder="Name" handleChange={(e) => setToken({...token, name: e.target.value})} />
          <Input placeholder="Symbol" handleChange={(e) => setToken({ ...token, symbol: e.target.value })} />
          <Input placeholder="Supply" handleChange={(e) => setToken({ ...token, supply: e.target.value })} />
        </div>
        <div className="button-box" style={{ marginTop: "1rem" }}>
          {
            address ? (
              <Button name="Create Token" handleClick={() => createToken(token, address, imageURL)} />
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

export default TokenCreator;
