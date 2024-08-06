import Button from "./Button";
import Input from "./Input";

const WithdrawToken = ({
	address,
	withdrawToken,
	connectWallet,
	setOpenWithdrawToken,
}) => {
  const [withdrawQuantity, setWithdrawQuantity] = useState({
    token: "",
    amount: ""
  });

	return (
		<div id="myModal" className="modal">
			<div className="modal-content">
				<span
					onClick={() => setOpenWithdrawToken(false)}
					className="close"
				>
					&times;
				</span>
				<h2 style={{marginBottom: "1rem"}}>Token Transfer</h2>
				<div className="input-container">
					<Input
						placeholder="Token Address"
						handleChange={(e) =>
							setWithdrawQuantity({
								...withdrawQuantity,
								token: e.target.value,
							})
						}
					/>
					<Input
						placeholder="Quantity"
						handleChange={(e) =>
							setWithdrawQuantity({
								...withdrawQuantity,
								amount: e.target.value,
							})
						}
					/>
				</div>
				<div className="button-box" style={{marginTop: "1rem"}}>
					{address ? (
						<Button
							name="Withdraw Token"
							handleClick={() => withdrawToken(withdrawQuantity)}
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

export default WithdrawToken;
