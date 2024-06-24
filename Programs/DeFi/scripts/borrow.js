const { getWeth, AMOUNT } = require("getWeth")
const { getNamedAccounts, ethers, network } = require("hardhat")
const { networkConfig } = require("../helper-hardhat-config")

const chainId = network.config.chainId

const getLendingPool = async (account) => {
    const lendingPoolAddressesProvider = await ethers.getContractAt("ILendingPoolAddressesProvider", networkConfig[chainId].lendingPoolAddressesProvider, account)
    const lendingPoolAddress = await lendingPoolAddressesProvider.getLendingPool()
    const lendingPool = await ethers.getContractAt("ILendingPool", lendingPoolAddress, account)

    return lendingPool
}

const approveERC20 = async (tokenAddress, spenderAddress, amountToSpend, account) => {
    const ERC20Token = await ethers.getContractAt("IERC20", tokenAddress, account)
    const transaction = await ERC20Token.approve(spenderAddress, amountToSpend)
    await transaction.wait(1)
}

const getBorrowerData = async (lendingPool, account) => {
    const { totalCollateralETH, totalDebtETH, availableBorrowsETH } = await lendingPool.getUserAccountData(account)

    console.log(`You have ${totalCollateralETH} worth of ETH deposited.`)
    console.log(`You have ${totalDebtETH} worth of ETH borrowed.`)
    console.log(`You can borrow ${availableBorrowsETH} worth of ETH.`)

    return { totalCollateralETH, totalDebtETH, availableBorrowsETH }
}

const getDaiPrice = async () => {
    const daiEthPriceFeed = await ethers.getContractAt("AggregatorV3Interface", networkConfig[chainId].daiEthPriceFeed)
    const price = (await daiEthPriceFeed.latestRoundData())[1]
    console.log(`The DAI/ETH price is ${price.toString()}`)
    return price
}

const borrowDai = async (lendingPool, amountDaiToBorrowWei, account) => {
    const transaction = await lendingPool.borrow(
        networkConfig[chainId].daiToken,
        amountDaiToBorrowWei.toString(),
        1,
        0,
        account
    )
    await transaction.wait(1)
    console.log("You've borrowed!")
}

const repayDai = async (lendingPool, amountDaiToRepayWei, account) => {
    await approveERC20(networkConfig[chainId].daiToken, lendingPool.address, amountDaiToRepayWei, account)

    const transaction = await lendingPool.repay(
        networkConfig[chainId].daiToken,
        amountDaiToRepayWei,
        1,
        account
    )
    await transaction.wait(1)
    console.log("Repayed!")
}


const main = async () => {
    await getWeth()

    const { deployer } = await getNamedAccounts()
    const lendingPool = await getLendingPool(deployer)
    console.log(`LendingPool address ${lendingPool}`)

    await approveERC20(networkConfig[chainId].wethToken, lendingPool.target, AMOUNT, deployer)
    console.log("Depositing...")
    await lendingPool.deposit(networkConfig[chainId].wethToken, AMOUNT, deployer, 0)
    console.log("Deposited!")

    const { availableBorrowsETH } = await getBorrowerData(lendingPool, deployer)

    const daiPrice = await getDaiPrice()
    const amountDaiToBorrow = availableBorrowsETH.toString() * 0.95 * (1 / daiPrice.toNumber())
    console.log(`Borrowing ${amountDaiToBorrow} DAI...`)

    const amountDaiToBorrowWei = ethers.parseEther(amountDaiToBorrow.toString())

    await borrowDai(lendingPool, amountDaiToBorrowWei, deployer)
    await getBorrowerData(lendingPool, deployer)
    
    await repayDai(lendingPool, amountDaiToBorrowWei, deployer)
    await getBorrowerData(lendingPool, deployer)
}

main()
    .then(() => process.exit(0))
    .catch(error => { console.error(error) })