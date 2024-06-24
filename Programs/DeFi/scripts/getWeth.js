const { ethers, getNamedAccounts } = require("hardhat")

const AMOUNT = ethers.parseEther("0.1")

const getWeth = async () => {
    const { deployer } = await getNamedAccounts()
    const iWeth = await ethers.getContractAt("IWeth", process.env.WETH_TOKEN_ADDRESS, deployer)
    const transaction = await iWeth.deposit({ value: AMOUNT })
    await transaction.wait(1)
    const wethBalance = await iWeth.balanceOf(deployer)
    console.log(`Got ${ethers.utils.formatEther(wethBalance)} WETH`)
}

module.exports = { getWeth, AMOUNT }