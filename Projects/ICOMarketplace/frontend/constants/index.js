import {useState, createContext, useContext, useEffect} from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { CUSTOM_TOKEN_CONTRACT, ICO_MARKETPLACE_CONTRACT, handleNetworkSwitch, ICO_MARKETPLACE_ADDRESS, CUSTOM_TOKEN_BYTECODE } from "./constants";

const StateContext = createContext()

export const StateContextProvider = ({ children }) => {
    const [address, setAddress] = useState("")
    const [balance, setBalance] = useState(0)
    const [loader, setLoader] = useState(false)
    const [recall, setRecall] = useState(false)
    const [currency, setCurrency] = useState("")
    const [openBuyToken, setOpenBuyToken] = useState("")
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
            await handleNetworkSwitch()
            const accounts = await window.ethereum.request({ method: "eth_accounts" })
            if (accounts.length > 0) {
                const account = accounts[0]
                setAddress(account)
                const provider = new ethers.BrowserProvider(window.ethereum)
                const balance = await provider.getBalance(account)
                setBalance(ethers.formatEther(balance))
                return account
            } else {
                notifyError("No authorized account found")
            }
        } catch (error) {
            notifyError(error.message)
        }
    }

    useEffect(() => {
        checkWalletConnection()
    }, [address])

    const connectWallet = async () => {
		try {
			if (!window.ethereum) {
				return notifyError("No crypto wallet found");
            }
            await handleNetworkSwitch();
			const accounts = await window.ethereum.request({
				method: "eth_requestAccounts",
			});
			if (accounts.length > 0) {
				const account = accounts[0];
				setAddress(account);
				const provider = new ethers.BrowserProvider(
					window.ethereum
				);
				const balance = await provider.getBalance(account);
				setBalance(ethers.formatEther(balance));
				return account;
			} else {
				notifyError("No authorized account found");
			}
		} catch (error) {
			notifyError(error.message);
		}
    };
    
   const deployContract = async (
		signer,
		account,
		name,
		symbol,
		supply,
		imageURL
   ) => {
		try {
			// Create a new contract factory
			const contractFactory = new ethers.ContractFactory(
				CUSTOM_TOKEN_CONTRACT,
				CUSTOM_TOKEN_BYTECODE,
				signer
			);

			// Deploy the contract with the token name and symbol
			let contract = await contractFactory.deploy(name, symbol);

			// Wait for the deployment transaction to be mined
			const transaction = await contractFactory.getDeployTransaction();

			if (contract.address) {
				// Get the current date
				const today = Date.now();
				const tokenCreatedDate = new Date(today);

				// Create the token object with details
				const token = {
					account: account,
					name: name,
					symbol: symbol,
					supply: supply, // Supply and imageURL are not used in the contract but kept for your records
					logo: imageURL,
					created: tokenCreatedDate,
					transactionHash: transaction.nonce,
				};
				// Retrieve token history from localStorage
				let tokenHistory =
					JSON.parse(localStorage.getItem("tokenHistory")) || [];
				// Add the new token to the history
				tokenHistory.push(token);
				// Save the updated history back to localStorage
				localStorage.setItem(
					"tokenHistory",
					JSON.stringify(tokenHistory)
				);

				// Handle post-deployment UI updates
				setLoader(false);
				setRecall(recall + 1);
				setOpenTokenCreator(false);
			}
		} catch (error) {
			setLoader(false);
			notifyError("Something went wrong");
			console.error(error);
		}
   };


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
                const provider = new ethers.BrowserProvider(connection)
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
            setLoader(true)
            notifySuccess("Getting tokens for sale...")
            await connectWallet()
            const contract = await ICO_MARKETPLACE_CONTRACT()
            if (address) {
                const tokensForSale = await contract.getAllTokens()

                const tokensForSaleArray = Promise.all(tokensForSale.map(async (token) => {
                    const contract = await CUSTOM_TOKEN_CONTRACT(token?.tokenAddress)
                    const balance = await contract.balanceOf(ICO_MARKETPLACE_ADDRESS)
                    const tokenDetails = {
                        creator: token?.creator,
                        address: token?.tokenAddress,
                        name: token?.name,
                        symbol: token?.symbol,
                        supply: ethers.formatEther(50000 * 10 ** 18),
                        supported: token?.supported,
                        price: ethers.formatEther(token?.price),
                        balance: ethers.formatEther(balance),
                    }

                    return tokenDetails
                }))

                setLoader(false)
                return tokensForSaleArray
            }
            else {
                setLoader(false)
                notifyError("No authorized account found")
            }
        }
        catch (error) {
            setLoader(false)
            notifyError("Something went wrong")
            console.log(error)
        }
    }
    
    const getUserTokensForSale = async () => {
         try {
				setLoader(true);
				notifySuccess("Getting tokens for sale...");
				await connectWallet();
				const contract = await ICO_MARKETPLACE_CONTRACT();
				if (address) {
					const tokensForSale = await contract.getCreatedTokens(address);

					const tokensForSaleArray = Promise.all(
						tokensForSale.map(async (token) => {
							const contract = await CUSTOM_TOKEN_CONTRACT(
								token?.tokenAddress
							);
							const balance = await contract.balanceOf(
								ICO_MARKETPLACE_ADDRESS
							);
							const tokenDetails = {
								creator: token?.creator,
								address: token?.tokenAddress,
								name: token?.name,
								symbol: token?.symbol,
								supply: ethers.formatEther(50000 * 10 ** 18),
								supported: token?.supported,
								price: ethers.formatEther(token?.price),
								balance: ethers.formatEther(balance),
							};

							return tokenDetails;
						})
					);

					setLoader(false);
					return tokensForSaleArray;
				} else {
					setLoader(false);
					notifyError("No authorized account found");
				}
			} catch (error) {
				setLoader(false);
				notifyError("Something went wrong");
				console.log(error);
			}
    }

    const createTokenIco = async (icoSale) => {
        try {
            const { address, price } = icoSale
            if (!address || !price) {
                return notifyError("All fields are required")
            }

            setLoader(true)
            notifySuccess("Creating Ico sale...")
            await connectWallet()

            const contract = await ICO_MARKETPLACE_CONTRACT()
            const payAmount = ethers.parseUnits(price.toString(), "ether")
            const transaction = await contract.createIcoSale(address, payAmount, {
                gasLimit: ethers.hexlify(100000),
            })
            const transactionReceipt = await transaction.wait()
            if (transactionReceipt) {
                setLoader(false)
                setRecall(recall + 1)
                setOpenIcoCreator(false)
            }
            else {
                setLoader(false)
                notifyError("Something went wrong")
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    const buyToken = async (tokenAddress, tokenQuantity) => {
        try {
            if (!tokenAddress || !tokenQuantity) {
                return notifyError("All fields are required")
            }

            setLoader(true)
            notifySuccess("Buying token...")
            const address = await connectWallet()

            const contract = await ICO_MARKETPLACE_CONTRACT()
            const tokenBalance = await contract.getBalance(tokenAddress)
            const tokenDetails = await contract.getTokenDetails(tokenAddress)

            const availableTokenBalance = ethers.formatEther(tokenBalance.toString())
            if (availableTokenBalance > 0) {
                const price = ethers.formatEther(tokenDetails.price.toString()) * tokenQuantity
                const payAmount = ethers.parseUnits(price.toString(), "ether")
                const transaction = await contract.buyToken(tokenAddress, tokenQuantity, {
                    value: payAmount,
                    gasLimit: ethers.hexlify(100000),
                })
                const transactionReceipt = await transaction.wait()
                if (transactionReceipt) {
                    setLoader(false)
                    setRecall(recall + 1)
                    setOpenBuyToken(false)
                    notifySuccess("Token bought successfully")
                }
                else {
                    setLoader(false)
                    notifyError("Something went wrong")
                }
            }
            else {
                setLoader(false)
                notifyError("Token not available")
            }
        }
        catch (error) {
            setLoader(false)
            notifyError("Something went wrong")
            console.log(error)
        }
    }

    const transferToken = async (transferAddress, tokenAddress, amount) => {
        try {
            if (!transferAddress || !amount || !tokenAddress) {
                return notifyError("All fields are required")
            }

            setLoader(true)
            notifySuccess("Transferring token...")
            const address = await connectWallet()

            const contract = await CUSTOM_TOKEN_CONTRACT(tokenAddress)
            const userBalance = await contract.balanceOf(address)
            const availableUserBalance = ethers.formatEther(userBalance.toString())

            if (availableUserBalance > 1) {
                const payAmount = ethers.parseUnits(amount.toString(), "ether")
                const transaction = await contract.transfer(transferAddress, payAmount, {
                    gasLimit: ethers.hexlify(100000),
                })
                const transactionReceipt = await transaction.wait()
                if (transactionReceipt) {
                    setLoader(false)
                    setRecall(recall + 1)
                    setOpenTransferToken(false)
                    notifySuccess("Token transferred successfully")
                }
                else {
                    setLoader(false)
                    notifyError("Something went wrong")
                }
            }
            else {
                setLoader(false)
                notifyError("Insufficient balance")
            }
        }
        catch (error) {
            setLoader(false)
            notifyError("Something went wrong")
            console.log(error)
        }
    }

    const withdrawToken = async (tokenAddress, amount) => {
        try {

            if (!tokenAddress || !amount) {
                return notifyError("All fields are required")
            }

            setLoader(true)
            notifySuccess("Withdrawing token...")

            const contract = await ICO_MARKETPLACE_CONTRACT()
            const payAmount = ethers.parseUnits(amount.toString(), "ether")
            const transaction = await contract.withdrawToken(tokenAddress, payAmount, {
                gasLimit: ethers.hexlify(100000),
            })
            const transactionReceipt = await transaction.wait()
            if (transactionReceipt) {
                setLoader(false)
                setRecall(recall + 1)
                setOpenWithdrawToken(false)
                notifySuccess("Token withdrawn successfully")
            }
            else {
                setLoader(false)
                notifyError("Something went wrong")
                
            }
        }
        catch (error) {
            setLoader(false)
            notifyError("Something went wrong")
            console.log(error)
        }
    }

    return (
		<StateContext.Provider
			value={{
				openIcoCreator,
				openBuyToken,
				openTransferToken,
				openWithdrawToken,
				loader,
				recall,
				address,
				openTokenCreator,
				balance,
				currency,
				withdrawToken,
				transferToken,
				buyToken,
				deployContract,
				setOpenIcoCreator,
				setOpenBuyToken,
				setOpenTransferToken,
				setOpenWithdrawToken,
				setLoader,
				setRecall,
				connectWallet,
				setOpenTokenCreator,
				createToken,
				createTokenIco,
                getTokensForSale,
                setAddress,
                getUserTokensForSale,
                setCurrency
			}}
		>
			{children}
		</StateContext.Provider>
	);
}

export const useStateContext = () => useContext(StateContext)