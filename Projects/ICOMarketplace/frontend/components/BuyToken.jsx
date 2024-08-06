import Button from "./Button";
import Input from "./Input";

const BuyToken = ({
  address,
  buyToken,
	connectWallet,
  buyIco,
  currency,
  setOpenBuyToken
}) => {
	const [tokenQuantity, setTokenQuantity] = useState();

	return (
		<div id="myModal" className="modal">
			<div className="modal-content">
				<span
					onClick={() => setOpenBuyToken(false)}
					className="close"
				>
					&times;
				</span>
				<h2 style={{marginBottom: "1rem"}}>Buy Token</h2>
				<div className="input-container">
					<Input
						placeholder="To Address"
						handleChange={(e) =>
							setTokenQuantity(e.target.value)
						}
					/>
					<Input
						placeholder={tokenQuantity ? `${tokenQuantity * Number(buyIco?.price)} ${currency}` : "Amount"}
					/>
				</div>
				<div className="button-box" style={{marginTop: "1rem"}}>
					{address ? (
						<Button
							name="Buy Token"
							handleClick={() => buyToken(tokenQuantity, buyIco?.address)}
						/>
					) : (
						<Button
							name="Connect Wallet"
							handleClick={() => connectWallet()}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default BuyToken;
