import { shortenAddress, useStateContext } from "@constants/constants";
import { ICO_MARKETPLACE_ADDRESS } from "@constants/constants";
import Header from "@components/Header";
import Footer from "@components/Footer"
import Loader from "@components/Loader";
import ICOMarket from "@components/ICOMarket";
import TokenCreator from "@components/TokenCreator";
import TokenHistory from "@components/TokenHistory";
import CreateICO from "@components/CreateICO";
import BuyToken from "@components/BuyToken";
import WidthdrawToken from "@components/WidthdrawToken";
import TokenTransfer from "@components/TokenTransfer"
import { useEffect } from "react";
import Marketplace from "@components/Marketplace";
import Card from "@components/Card";

const Home = () => {

  const {
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
    getUserTokensForSale,
    setAddress
  } = useStateContext()


  const notifySuccess = (msg) => toast.success(msg, { duration: 200 })
  const notifyError = (msg) => toast.error(msg, { duration: 200 })
  
  const [openAllIcos, setOpenAllIcos] = useState(false)
  const [openTokenHistory, setOpenTokenHistory] = useState(false)
  const [openIcoMarketplace, setOpenIcoMarketplace] = useState(false)
  const [buyIco, setBuyIco] = useState(false)
  const [allIcos, setAllIcos] = useState([])
  const [allUserIcos, setAllUserIcos] = useState([])

  const copyAddress = () => {
    navigator.clipboard.writeText(ICO_MARKETPLACE_ADDRESS)
    notifySuccess("Copied successfully")
  }

  useEffect(() => {
    const setTokensForSale = async () => {
      const tokens = await getTokensForSale()
      setAllIcos(tokens)
      const userTokens = await getUserTokensForSale()
      setAllUserIcos(userTokens)
    }

    if (address) {
      setTokensForSale()
    }
  }, [address, recall])

  return (
		<div>
			<Header
				accountBalance={balance}
				setAddress={setAddress}
				address={address}
				connectWallet={connectWallet}
				ICO_MARKETPLACE_ADDRESS={ICO_MARKETPLACE_ADDRESS}
				shortenAddress={shortenAddress}
				setOpenAllIco={setOpenAllIcos}
				openAllIco={openAllIcos}
				setOpenTokenCreator={setOpenTokenCreator}
				openTokenCreator={openTokenCreator}
				setOpenIcoMarketplace={openIcoMarketplace}
			/>

			<div className="create">
				<h1 style={{fontSize: "2rem"}}>ICO Marketplace</h1>
				{allIcos?.length > 0 && (
					<Marketplace
						icos={allIcos}
						shortenAddress={shortenAddress}
						setBuyIco={setBuyIco}
						setOpenBuyToken={setOpenBuyToken}
						currency={currency}
					/>
				)}
				<Card
					setOpenAllIcos={setOpenAllIcos}
					setOpenTokenCreator={setOpenTokenCreator}
					setOpenTransferToken={setOpenTransferToken}
					setOpenWithdrawToken={setOpenWithdrawToken}
					setOpenIcoMarketplace={setOpenIcoMarketplace}
					setOpenTokenHistory={setOpenTokenHistory}
					setOpenIcoCreator={setOpenIcoCreator}
				/>
			</div>
			{openAllIcos && (
				<ICOMarket
					allIcos={allIcos}
					shortenAddress={shortenAddress}
					handleClick={setOpenAllIcos}
					currency={currency}
				/>
			)}
			{openTokenCreator && (
				<TokenCreator
					createToken={createToken}
					shortenAddress={shortenAddress}
					setOpenTokenCreator={setOpenTokenCreator}
					address={address}
					connectWallet={connectWallet}
				/>
			)}
			{openTokenHistory && (
				<TokenHistory
					shortenAddress={shortenAddress}
					setOpenTokenHistory={setOpenTokenHistory}
				/>
			)}
			{openIcoCreator && (
				<CreateICO
					shortenAddress={shortenAddress}
					address={address}
					connectWallet={connectWallet}
					setOpenIcoCreator={setOpenIcoCreator}
					createTokenIco={createTokenIco}
				/>
			)}
			{openIcoMarketplace && (
				<ICOMarket
					allIcos={allUserIcos}
					shortenAddress={shortenAddress}
					handleClick={setOpenIcoMarketplace}
					currency={currency}
				/>
			)}
			{openBuyToken && (
				<BuyToken
					address={address}
					buyToken={buyToken}
					connectWallet={connectWallet}
					setOpenBuyToken={setOpenBuyToken}
					buyIco={buyIco}
					currency={currency}
				/>
			)}
      {openWithdrawToken && (
        <WidthdrawToken 
          address={address}
          withdrawToken={withdrawToken}
          connectWallet={connectWallet}
          setOpenWithdrawToken={setOpenWithdrawToken}
        />
      )}
			{openTransferToken && (
				<TokenTransfer
					address={address}
					transferToken={transferToken}
					connectWallet={connectWallet}
					setOpenTransferToken={setOpenTransferToken}
				/>
			)}
			<Footer />
			<Loader />
		</div>
  );
};

export default Home