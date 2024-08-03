import { ethers } from "ethers";
import Web3Modal from "web3modal";
import customTokenAbi from "@constants/CustomToken.json";
import icoMarketplaceAbi from "@constants/IcoMarketplace.json";
import addresses from "@constants/addresses.json";

export const CUSTOM_TOKEN_ABI = customTokenAbi;
export const ICO_MARKETPLACE_ABI = icoMarketplaceAbi;

export const ICO_MARKETPLACE_ADDRESS = addresses.IcoMarketplace;
export const CUSTOM_TOKEN_ADDRESS = addresses.CustomToken;

export const CUSTOM_TOKEN_BYTECODE = customTokenAbi.bytecode;
export const ICO_MARKETPLACE_BYTECODE = icoMarketplaceAbi.bytecode;

export const NETWORKS = {
    sepolia: {
        chainId: 31337,
        chainName: "sepolia",
        rpcUrl: "http://localhost:8545",
        blockExplorerUrl: "",
        nativeCurrency: {
            name: "SEPOLIA",
            symbol: "SEPOLIA",
            decimals: 18,
        },
    },
}

export const changeNetwork = async ({ networkName }) => {
    try {
        if (!window.ethereum) 
            throw new Error("No crypto wallet found")
        await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: {
                ...NETWORKS[networkName]
            },
        });
    }
    catch (error) {
        console.log(error)
    }
}

export const handleNetworkSwitch = async ({ networkName }) => {
    const networkName = "sepolia"
    await changeNetwork({ networkName })
}

export const shortenAddress = (address) => `${address?.slice(0, 6)}...${address?.slice(address.length - 4)}`

const fetchContract = (address, abi, signer) => 
    new ethers.Contract(address, abi, signer)

export const ICO_MARKETPLACE_CONTRACT = async () => {
    try {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.Web3Provider(connection)
        const contract = fetchContract(address, ICO_MARKETPLACE_ABI, provider.getSigner())
        return contract
    }
    catch (error) {
        console.log(error)
    }
}

export const CUSTOM_TOKEN_CONTRACT = async () => {
    try {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.Web3Provider(connection)
        const contract = fetchContract(CUSTOM_TOKEN_ADDRESS, CUSTOM_TOKEN_ABI, provider.getSigner())
        return contract
    }
    catch (error) {
        console.log(error)
    }
}