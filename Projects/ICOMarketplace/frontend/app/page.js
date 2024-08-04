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
    setAddress
  } = useStateContext()


  const notifySuccess = (msg) => toast.success(msg, { duration: 200 })
  const notifyError = (msg) => toast.error(msg, { duration: 200 })
  
  const [openAllIcos, setOpenAllIcos] = useState(false)
  const [openTokenHistory, setOpenTokenHistory] = useState(false)
  const [openIcoMarketplace, setOpenIcoMarketplace] = useState(false)
  const [buyIco, setBuyIco] = useState(false)

  const copyAddress = () => {
    navigator.clipboard.writeText(ICO_MARKETPLACE_ADDRESS)
    notifySuccess("Copied successfully")
  }

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
      {
        openAllIcos && (
          <ICOMarket />
        )
      }
      {
        openTokenCreator && (
        <TokenCreator />
        )
      }
      {
        openTokenHistory && (
          <TokenHistory />
        )
      }
      {
        openIcoCreator && (
          <CreateICO />
        )
      }
      {
        openIcoMarketplace && (
          <ICOMarket />
        )
      }
      {
        openBuyToken && (
          <BuyToken />
        )
      }
      {
        openWithdrawToken && (
          <WidthdrawToken />
        )
      }
      {
        openTransferToken && (
          <TokenTransfer />
        )
      }
      <Footer />
      <Loader />
    </div>
  )
};

export default Home