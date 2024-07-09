import { ethers } from "ethers"


const ethToWei = (amount, decimals = 18) => {
    return ethers.parseUnits(amount, decimals).toString()
}

const weiToEth = (amount, decimals = 18) => {
    return ethers.formatUnits(amount, decimals).toString()
}

export { ethToWei, weiToEth }