const Cards = ({
	setOpenAllIcos,
	setOpenTokenCreator,
	setOpenTransferToken,
	setOpenWithdrawToken,
	setOpenIcoMarketplace,
	setOpenTokenHistory,
	setOpenIcoCreator,
}) => {
	const features = [
		{
			title: "ICO ADDRESS",
			description:
				"Get details of ICO Contract and copy the ico contract address to transfer the token to ICO Contract",
			btnName: "Copy Address",
		},
		{
			title: "Create ICO",
			description:
				"Get details of ICO Contract and copy the ico contract address to transfer the token to ICO Contract",
			btnName: "Create ICO",
		},
		{
			title: "Your Created ICO",
			description:
				"See all your created Initial Coin Offerings here",
			btnName: "Get All Created ICO",
		},
		{
			title: "ICO Marketplace",
			description:
				"The ICO marketplace is a comprehensive platform providing detailed information on Initial Coin Offerings (ICOs) worldwide",
			btnName: "Listed ICOs",
		},
		{
			title: "Create Token",
			description:
				"Creating a token involves defining it on a blockchain platform, such as Ethereum, Binance Smart Chain, or others that support smart contracts",
			btnName: "Create Token",
		},
		{
			title: "History",
			description:
				"To create a token that logs the history of token creation by a single user, we can extend the ERC-20 contract with additional functionality to record each instance a user mints new tokens",
			btnName: "Get Token History",
		},
		{
			title: "Transfer Token",
			description:
				"To enable the transfer of tokens between users within your smart contract, you'll need to implement functions that allow token holders to send tokens to others",
			btnName: "Transfer Token",
		},
		{
			title: "Withdraw Token",
			description:
				"To enable the withdrawal of tokens you will need to be the token creator",
			btnName: "Withdraw Token",
		},
	];

	return (
		<div className="wrapper">
			{features.map((feature, index) => (
				<div key={index} className="card">
					<h2 className="card-title">{feature.title}</h2>
					<p
						className="card-content"
						style={{
							marginTop: "1rem",
						}}
					>
						{feature.description}
					</p>
					<button
						className="card-btn"
						onClick={() => {
							switch (feature.btnName) {
								case "Copy Address":
									setOpenAllIcos(true);
									break;
								case "Create ICO":
									setOpenIcoCreator(true);
									break;
								case "Get All Created ICO":
									setOpenAllIcos(true);
									break;
								case "Listed ICOs":
									setOpenIcoMarketplace(true);
									break;
								case "Create Token":
									setOpenTokenCreator(true);
									break;
								case "Get Token History":
									setOpenTokenHistory(true);
									break;
								case "Transfer Token":
									setOpenTransferToken(true);
									break;
								case "Withdraw Token":
									setOpenWithdrawToken(true);
									break;
							}
						}}
					>
						{feature.btnName}
					</button>
				</div>
			))}
		</div>
	);
};

export default Cards;
