import { ethers } from "ethers"


const ethToWei = (amount, decimals = 18) => {
    return ethers.parseUnits(amount, decimals).toString()
}

const weiToEth = (amount, decimals = 18) => {
    return ethers.formatUnits(amount, decimals).toString()
}

const parseErrorMsg = (e) => {
	const jsonError = JSON.parse(JSON.stringify(e));
	return jsonError.reason || jsonError.error;
};

export { ethToWei, weiToEth, parseErrorMsg }