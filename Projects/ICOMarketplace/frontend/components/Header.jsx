import { useEffect, useState } from "react";
import Button from "./Button";

const Header = ({
    accountBalance,
    setAddress,
    address,
    connectWallet,
    ICO_MARKETPLACE_ADDRESS,
    shortenAddress,
    setOpenAllIcos,
    openAllIcos,
    setOpenTokenCreator,
    openTokenCreator,
    openIcoMarketplace,
    setOpenIcoMarketplace
}) => {
  const [isMetamaskInstalled, setIsMetamaskInstalled] = useState(false)
  
  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setIsMetamaskInstalled(true)
    }

    window.ethereum.on("accountsChanged", handleAccountsChanged)

    return () => {
      if (typeof window.ethereum !== "undefined") {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged)
      }
    }

  }, [address])

  const handleAccountsChanged = (accounts) => {
    setAddress(accounts[0])
  }


  return (
		<header className="header">
			<nav>
				<div className="logo">
					<a href="/">
						ICO <span> Marketplace</span>
					</a>
				</div>
				<input type="checkbox" name="" id="menu-toggle" />
				<label htmlFor="menu-toggle" className="menu-icon">
					&#9776;
				</label>
				<ul className="menu">
					<li>
						<a href="/">Home</a>
					</li>
					<li>
						<a
							onClick={() =>
								openIcoMarketplace
									? setOpenIcoMarketplace(false)
									: setOpenIcoMarketplace(true)
							}
						>
							ICO Marketplace
						</a>
					</li>
					<li>
						<a
							onClick={() =>
								openAllIcos
									? setOpenAllIcos(false)
									: setOpenAllIcos(true)
							}
						>
							Created ICOs
						</a>
						<a
							onClick={() =>
								openTokenHistory
									? setOpenTokenHistory(false)
									: setOpenTokenHistory(true)
							}
						>
							History
						</a>
					</li>
					{address ? (
						<li>
							<Button
								name={`${shortenAddress(
									address
								)}: ${accountBalance?.slice(0, 5)}`}
							/>
						</li>
					) : (
						<li>
							<Button
								  name="Connect wallet"
								  handleClick = {connectWallet}
							/>
						</li>
					)}
				</ul>
			</nav>
		</header>
  );
};

export default Header;