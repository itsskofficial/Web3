import { getTokenContract, getDexContract } from "@utils/contracts";
import { ethToWei, weiToEth, parseErrorMsg } from "@utils/helpers";

const swapEthToToken = async (tokenSymbol, amount) => {
    try {
        const args = { value: ethToWei(amount) }
        const customDex = await getDexContract()
        const transaction = await customDex.swapEthToToken(tokenSymbol, args)

        const transactionReceipt = await transaction.wait(1)
        return transactionReceipt
    } catch (e) {
        return parseErrorMsg(e)
    }
}

const checkAllowance = async (owner, tokenSymbol, amount) => {
    try {
        const customDex = await getDexContract()
        const tokenAddress = await customDex.getTokenAddress(tokenSymbol)
        const customToken = await getTokenContract(tokenAddress)
        const transaction = await customToken.allowance(
            owner, 
            customDex.address
        )

        const result = BigInt(transaction.toString()).gte(BigInt.from(ethToWei(amount)))
        return result
    } catch (e) {
        return parseErrorMsg(e)
    }
}

const swapTokenToEth = async (tokenSymbol, amount) => {
    try {
        const customDex = await getDexContract()
        const transaction = await customDex.swapTokenToEth(tokenSymbol, ethToWei(amount))

        const transactionReceipt = await transaction.wait(1)
        return transactionReceipt
    } catch (e) {
        return parseErrorMsg(e)
    }
}

const swapTokenToToken = async (tokenA, tokenB, amount) => {
    try {
        const customDex = await getDexContract()
        const transaction = await customDex.swapTokenToToken(tokenA, tokenB, ethToWei(amount))

        const transactionReceipt = await transaction.wait(1)
        return transactionReceipt
    } catch (e) {
        return parseErrorMsg(e)
    }
}

const getTokenBalance = async (tokenSymbol, address) => {
    try {
        const customDex = await getDexContract()
        const tokenBalance = await customDex.getTokenBalance(tokenSymbol, address)
        return tokenBalance
    } catch (e) {
        return parseErrorMsg(e)
    }
}

const getTokenAddress = async (tokenSymbol, address) => {
	try {
		const customDex = await getDexContract();
		const tokenAddress = await customDex.getTokenAddress(
			tokenSymbol,
		);
		return tokenAddress;
	} catch (e) {
		return parseErrorMsg(e);
	}
};

const increaseAllowance = async (tokenSymbol, amount) => {
    try {
        const customDex = await getDexContract();
        const tokenAddress = await customDex.getTokenAddress(
            tokenSymbol,
        );
        
        const customToken = await getTokenContract(tokenAddress)
        const transaction = await customToken.approve("address", ethToWei(amount))

        const transactionReceipt = await transaction.wait(1)
        return transactionReceipt
    } catch (e) {
        return parseErrorMsg(e)
    }
}


const getTransactionHistory = async () => {
    try {
		const customDex = await getDexContract();
        const transactionHistory = await customDex.getTransactionHistory();
        const formattedTransactionHistory = transactionHistory.map((transaction, i) => ({
            id: transaction.id,
            tokenA: transaction.tokenA,
            tokenB: transaction.tokenB,
            inputValue: weiToEth(transaction.inputValue),
            outputValue: weiToEth(transaction.outputValue),
            user: transaction.user
        }))

		return formattedTransactionHistory
	} catch (e) {
		return parseErrorMsg(e);
	}
}

export {swapEthToToken, swapTokenToEth, swapTokenToToken, getTokenAddress, getTokenBalance, getTransactionHistory, checkAllowance, increaseAllowance}