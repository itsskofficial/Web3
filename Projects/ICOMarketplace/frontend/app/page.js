"use client"

import { shortenAddress } from "@constants/constants";
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
import { useState, useEffect } from "react";
import Marketplace from "@components/Marketplace";
import Cards from "@components/Cards";
import { useStateContext } from "@constants";

const Home = () => {

const {
	loader,
    openIcoCreator,
    openBuyToken,
    openTransferToken,
    openWithdrawToken,
    recall,
    address,
    openTokenCreator,
    balance,
    currency,
    withdrawToken,
    transferToken,
    buyToken,
    setOpenIcoCreator,
    setOpenBuyToken,
    setOpenTransferToken,
    setOpenWithdrawToken,
    connectWallet,
    setOpenTokenCreator,
    createToken,
    createTokenIco,
    getTokensForSale,
    getUserTokensForSale,
    setAddress,
	setLoader
  } = useStateContext()
  
	const [openAllIcos, setOpenAllIcos] = useState(false)
	const [openUserIcos, setOpenUserIcos] = useState(false)
	const [openTokenHistory, setOpenTokenHistory] = useState(false)
	const [openIcoMarketplace, setOpenIcoMarketplace] = useState(false)
	const [buyIco, setBuyIco] = useState(false)
	const [allIcos, setAllIcos] = useState([])
	const [allUserIcos, setAllUserIcos] = useState([])

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
			  	setOpenAllIcos={setOpenAllIcos}
			  	allUserIcos={allUserIcos}
			  	setAllUserIcos={setAllUserIcos}
				openAllIcos={openAllIcos}
				openUserIcos={openUserIcos}
				setOpenUserIcos={setOpenUserIcos}
				setOpenTokenCreator={setOpenTokenCreator}
				openTokenCreator={openTokenCreator}
				openIcoMarketplace={openIcoMarketplace}
			  setOpenIcoMarketplace={setOpenIcoMarketplace}
			  openTokenHistory={openTokenHistory}
			  setOpenTokenHistory={setOpenTokenHistory}
			/>

			<div className="create">
				<h1 style={{fontSize: "2rem"}}>ICO Marketplace</h1>
				{allIcos?.length > 0 && (
					<Marketplace
						allIcos={allIcos}
						shortenAddress={shortenAddress}
						setBuyIco={setBuyIco}
						setOpenBuyToken={setOpenBuyToken}
						currency={currency}
					/>
				)}
				<Cards
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
					setLoader={setLoader}
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
		  {loader && <Loader />}
			<Footer />
		</div>
  );
};

export default Home