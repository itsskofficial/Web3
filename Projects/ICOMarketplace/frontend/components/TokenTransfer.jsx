import Button from "./Button";
import Input from "./Input";

const TokenTransfer = ({address, connectWallet, transferToken, setOpenTransferToken}) => {
    const [transferTokenData, setTransferTokenData] = useState({
        address: "",
        tokenAddress: "",
        amount: 0
    })

    return (
		<div id="myModal" className="modal">
			<div className="modal-content">
				<span
					onClick={() => setOpenTransferToken(false)}
					className="close"
				>
					&times;
				</span>
				<h2 style={{marginBottom: "1rem"}}>Token Transfer</h2>
				<div className="input-container">
					<Input
						placeholder="To Address"
						handleChange={(e) =>
							setTransferTokenData({...transferTokenData, address: e.target.value})
						}
					/>
					<Input
						placeholder="Token Address"
						handleChange={(e) =>
							setTransferTokenData({...transferTokenData, tokenAddress: e.target.value})
						}
                    />
                    <Input
                        placeholder="Amount"
                        handleChange={(e) =>
                            setTransferTokenData({...transferTokenData, amount: e.target.value})
                        }
                    />
				</div>
				<div className="button-box" style={{marginTop: "1rem"}}>
					{address ? (
						<Button
							name="Transfer Token"
							handleClick={() => transferToken(transferTokenData)}
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
}

export default TokenTransfer
