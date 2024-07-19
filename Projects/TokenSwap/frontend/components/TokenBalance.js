import {useEffect, useState} from "react";
import {ethers} from "ethers";
import {
	ClipboardIcon,
	ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/outline";
import TransactionStatus from "./TransactionStatus";
import {getTokenAddress, getTokenBalance} from "@utils/context";

const TokenBalance = ({name, walletAddress}) => {
	const [balance, setBalance] = useState("");
	const [tokenAddress, setTokenAddress] = useState("");
	const [copyIcon, setCopyIcon] = useState(false);
	const [transactionPending, setTransactionPending] = useState(false);

	const fetchTokenBalance = async () => {
		let balance = await getTokenBalance(walletAddress);
		balance = ethers.formatUnits(balance, 18);
		setBalance(balance);
	};

	const fetchTokenAddress = async () => {
		const address = await getTokenAddress(name);
		setTokenAddress(address);
	};

	useEffect(() => {
		if (name && walletAddress) {
			fetchTokenBalance();
			fetchTokenAddress();
		} else {
			setBalance("0");
		}
	}, [name, walletAddress]);

	const handleCopy = () => {
		navigator.clipboard.writeText(tokenAddress);
		setCopyIcon(true);
		setTimeout(() => {
			setCopyIcon(false);
		}, 2000);
	};

	return (
		<div className="flex mx-2 border-[1px] rounded-l rounded-r-lg border-[#7765f3]">
			<div className="flex items-center bg-zinc-900 text-zinc-300 w-fit p-2 px-3 rounded-l-lg">
				<p className="text-sm">{name}</p>
				<p className="bg-zinc-800 p-0.5 px-3 ml-3 rounded-lg text-zinc-100">
					{balance}
				</p>
			</div>
			<div className="flex items-center bg-zinc-900 text-zinc-300 w-fit p-2 px-3 rounded-r-lg">
				{copyIcon ? (
					<ClipboardDocumentCheckIcon
						className="h-6 w-6 cursor-pointer"
						onClick={handleCopy}
					/>
				) : (
					<ClipboardIcon
						className="h-6 w-6 cursor-pointer"
						onClick={handleCopy}
					/>
				)}
				{transactionPending && <TransactionStatus />}
			</div>
		</div>
	);
};

export default TokenBalance;