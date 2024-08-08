import { ethers } from "ethers";
import customDexAbi from "@constants/CustomDex.json";
import customTokenAbi from "@constants/CustomToken.json";

const getTokenContract = async (address) => {
    const provider = new ethers.BrowserProvider(window.ethereum

    if (window.ethereum {
        const signer = provider.getSigner()
        const contractReader = new ethers.Contract(address, customTokenAbi, signer)
        return contractReader;
    }
}

const getDexContract = async (address) => {
    const provider = new ethers.BrowserProvider(window.ethereum

    if (window.ethereum {
        const signer = provider.getSigner()
        const contractReader = new ethers.Contract(address, customDexAbi, signer)
        return contractReader
    }
}

export {getTokenContract, getDexContract}
