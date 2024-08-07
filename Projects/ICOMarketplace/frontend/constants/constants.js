import { ethers } from "ethers";
import Web3Modal from "web3modal";
import customTokenAbi from "@constants/CustomToken.json";
import icoMarketplaceAbi from "@constants/IcoMarketplace.json";
import addresses from "@constants/addresses.json";
import bytecodes from "@constants/bytecodes.json";

export const CUSTOM_TOKEN_ABI = customTokenAbi;
export const ICO_MARKETPLACE_ABI = icoMarketplaceAbi;

export const ICO_MARKETPLACE_ADDRESS = addresses["11155111"]["ICOMarketplace"];
export const CUSTOM_TOKEN_ADDRESS = addresses["11155111"]["CustomToken"];

export const CUSTOM_TOKEN_BYTECODE = bytecodes["CustomToken"];
export const ICO_MARKETPLACE_BYTECODE = bytecodes["ICOMarketplace"];

export const NETWORKS = {
	sepolia: {
		chainId: 11155111,
		chainName: "sepolia",
		rpcUrl: process.env.SEPOLIA_RPC_URL,
		blockExplorerUrl: "",
		nativeCurrency: {
			name: "SEPOLIA",
			symbol: "SEPOLIA",
			decimals: 18,
		},
	},
};

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

export const handleNetworkSwitch = async ({ networkName = "sepolia" }) => {
    await changeNetwork({ networkName })
}

export const shortenAddress = (address) => `${address?.slice(0, 6)}...${address?.slice(address.length - 4)}`

const fetchContract = (address, abi, signer) => 
    new ethers.Contract(address, abi, signer)

export const ICO_MARKETPLACE_CONTRACT = async () => {
    try {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.BrowserProvider(connection)
        const signer = await provider.getSigner()
        const contract = fetchContract(ICO_MARKETPLACE_ADDRESS, ICO_MARKETPLACE_ABI, signer)
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
        const provider = new ethers.BrowserProvider(connection)
        const signer = await provider.getSigner();
        const contract = fetchContract(CUSTOM_TOKEN_ADDRESS, CUSTOM_TOKEN_ABI, signer)
        return contract
    }
    catch (error) {
        console.log(error)
    }
}