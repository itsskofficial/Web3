import {useState, useEffect, createContext} from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import "@constants/constants";

const StateContext = createContext()

export const StateContextProvider = ({ children }) => {
    const [address, setAddress] = useState("")
    const [balance, setBalance] = useState(0)
    const [loader, setLoader] = useState(false)
    const [recall, setRecall] = useState(false)
    const [currency, setCurrency] = useState("")
    const [openBuyToken, setBuyToken] = useState("")
    const [openWithdrawToken, setOpenWithdrawToken] = useState("")
    const [openTransferToken, setOpenTransferToken] = useState("")
    const [openTokenCreator, setOpenTokenCreator] = useState("")
    const [openIcoCreator, setOpenIcoCreator] = useState("")

    const notifySuccess = (msg) => toast.success(msg, { duration: 200 })
    const notifyError = (msg) => toast.error(msg, { duration: 200 })

    const checkWalletConnection = async () => {
        try {
            if (!window.ethereum) {
                return notifyError("No crypto wallet found")
            }
            const accounts = await window.ethereum.request({ method: "eth_accounts" })
            if (accounts.length) {
                const account = accounts[0]
                setAddress(account)
                const provider = new ethers.providers.Web3Provider(window.ethereum)
                const balance = await provider.getBalance(account)
                setBalance(ethers.utils.formatEther(balance))
                return account
            } else {
                notifyError("No authorized account found")
            }
        } catch (error) {
            notifyError(error.message)
        }
    }

    const connectWallet = async () => {
		try {
			if (!window.ethereum) {
				return notifyError("No crypto wallet found");
			}
			const accounts = await window.ethereum.request({
				method: "eth_requestAccounts",
			});
			if (accounts.length) {
				const account = accounts[0];
				setAddress(account);
				const provider = new ethers.providers.Web3Provider(
					window.ethereum
				);
				const balance = await provider.getBalance(account);
				setBalance(ethers.utils.formatEther(balance));
				return account;
			} else {
				notifyError("No authorized account found");
			}
		} catch (error) {
			notifyError(error.message);
		}
    };
    
    const deployContract = async (signer, account, name, symbol, supply, imageURL) => {
        try {
            const contractFactory = new ethers.ContractFactory(ICO_MARKETPLACE_ABI, ICO_MARKETPLACE_BYTECODE, signer)
            const totalSupply = ethers.utils.parseEther(supply)
            let contract = await contractFactory.deploy(name, symbol, totalSupply, imageURL)
            const transaction = await contract.deployTransaction.wait()
            if (contract.address) {
                const today = Date.now()
                let date = new Date(today)
                const tokenCreatedDate = date
                const token = {
                    account: account, 
                    name: name,
                    symbol: symbol,
                    supply: supply,
                    logo: imageURL,
                    created: tokenCreatedDate,
                    transactionHash: contract.deployTransaction.hash,
                }
            }

            let tokenHistory = []
            const history = localStorage.getItem("tokenHistory")
            if (history) {
                tokenHistory = JSON.parse(localStorage.getItem("tokenHistory"))
                tokenHistory.push(token)
                localStorage.setItem("tokenHistory", JSON.stringify(tokenHistory))
                setLoader(false)
                setRecall(recall + 1)
                setOpenTokenCreator(false)
            }
            else {
                tokenHistory.push(token)
                localStorage.setItem("tokenHistory", JSON.stringify(tokenHistory))
                setLoader(false)
                setRecall(recall + 1)
                setOpenTokenCreator(false)
            }
        }
        catch (error) {
            setLoader(false)
            notifyError("Something went wrong")
            console.log(error)
        }
    }
    const createToken = async (token, account, imageURL) => {
        const { name, symbol, supply } = token
        try {
            setLoader(true)
            notifySuccess("Creating token...")
            if (!name || !symbol || !supply) {
                notifyError("All fields are required")
            }
            else {
                const web3Modal = new Web3Modal()
                const connection = await web3Modal.connect()
                const provider = new ethers.providers.Web3Provider(connection)
                const signer = provider.getSigner()

                deployContract(signer, account, name, symbol, supply, imageURL)
            }
        }
        catch (error) {
            setLoader(false)
            notifyError("Something went wrong")
            console.log(error)
        }
    }
    const getTokensForSale = async () => {
        try {

        }
        catch (error) {
            console.log(error)
        }
    }
    const getUserTokensForSale = async () => {
        try {

        }
        catch (error) {
            console.log(error)
        }
    }
    const createTokenIco = async () => {
        try {

        }
        catch (error) {
            console.log(error)
        }
    }
    const buyToken = async () => {
        try {

        }
        catch (error) {
            console.log(error)
        }
    }
    const transferToken = async () => {
        try {

        }
        catch (error) {
            console.log(error)
        }
    }

    

    return (
        <StateContext.Provider value={{}}>
            {children}
        </StateContext.Provider>
    )
}