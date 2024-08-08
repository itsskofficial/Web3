import React from "react";
import toast from "react-hot-toast";

const ICOMarket = ({allIcos, shortenAddress, handleClick, currency}) => {
	const notifySuccess = (msg) => toast.success(msg, {duration: 2000});
	const notifyError = (msg) => toast.error(msg, {duration: 2000});

	const copy = (text) => {
		navigator.clipboard.writeText(text);
		notifySuccess("Copied successfully");
	};

	return (
		<div className="modal">
			<div className="modal-content">
				<span onClick={() => handleClick(false)} className="close">
					&times;
				</span>
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
								<th>Price</th>
							</tr>
						</thead>
						<tbody>
							{allIcos?.map((item, index) => (
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
									<td>
										{item.price} {currency}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default ICOMarket;
