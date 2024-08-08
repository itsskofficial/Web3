import React from "react";
import Button from "./Button";
import toast from "react-hot-toast";

const Marketplace = ({
	allIcos,
	shortenAddress,
	setBuyIco,
	setOpenBuyToken,
	currency,
}) => {
	const notifySuccess = (msg) => toast.success(msg, {duration: 2000});
	const notifyError = (msg) => toast.error(msg, { duration: 2000 });

	const copy = (text) => {
		navigator.clipboard.writeText(text);
		notifySuccess("Copied successfully");
	};

	return (
		<>
			<h2>All ICOs</h2>
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
						{allIcos?.map((item, index) => (
							<tr key={index}>
								<td>{item.name}</td>
								<td>{item.symbol}</td>
								<td>{item.balance}</td>
								<td onClick={() => copy(item.address)}>
									{shortenAddress(item.address)}
								</td>
								<td onClick={() => copy(item.creator)}>
									{shortenAddress(item.creator)}
								</td>
								<td>
									{item.price} {currency}
								</td>
								<td
									onClick={() => (
										setBuyIco(item), setOpenBuyToken(true)
									)}
								>
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
