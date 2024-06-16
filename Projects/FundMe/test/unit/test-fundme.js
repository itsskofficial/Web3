const { deployments, ethers, getNamedAccounts } = require("hardhat")
const {assert, expect} = require("chai")

describe("FundMe", async () => {
    let fundMe, deployer, mockV3Aggregator

    beforeEach(async () => {
        deployer = (await getNamedAccounts()).deployer
        await deployments.fixture(["all"])
        fundMe = await ethers.getContractAt("FundMe", deployer)
        mockV3Aggregator = await ethers.getContractAt("MockV3Aggregator", deployer)
    })

    describe("constructor", async () => {
        it("sets the aggregator address correctly", async () => {
            const response = await fundMe.getPriceFeed()
            assert.equal(response, mockV3Aggregator.address)
        })
    })

    describe("fund", async () => {
        it("fails if you don't send enough ETH", async () => {
            await expect(fundMe.fund()).to.be.revertedWith("You need to spend more ETH!")
        })

        it("updates the amount funded data structure", async () => {
            await fundMe.fund({ value: ethers.parseEther("1") })
            const response = await fundMe.getAddressToAmountFunded(deployer)
            assert.equal(response.toString(), ethers.parseEther("1").toString())
        })

        it("adds funder to array of funders", async () => {
            await fundMe.fund({ value: ethers.parseEther("1") })
            const response = await fundMe.getFunder(0)
            assert.equal(response, deployer)
        })
    })

    describe("withdraw", async () => {
        beforeEach(async () => {
            await fundMe.fund({ value: ethers.parseEther("1") })
        })

        it("withdraw ETH from a single funder", async () => {
            // Arrange
            const startingFundMeBalance = await fundMe.provider.getBalance(fundMe.address) 
            const startingDeployerBalance = await fundMe.provider.getBalance(deployer)  
            // Act
            const transactionResponse = await fundMe.withdraw()
            const transactionReceipt = await transactionResponse.wait(1)
            const { gasUsed, effectiveGasPrice } = transactionReceipt
            const gasCost = gasUsed.mul(effectiveGasPrice)
            const endingFundMeBalance = await fundMe.provider.getBalance(fundMe.address)
            const endingDeployerBalance = await fundMe.provider.getBalance(deployer)  
            // Assert
            assert.equal(endingFundMeBalance, 0)
            assert.equal(startingFundMeBalance.add(startingDeployerBalance).toString(), endingDeployerBalance.add(gasCost).toString())
        })

        it("allows us to withdraw with multiple getFunder", async () => {
            // Arrange
            const accounts = await ethers.getSigners()
            for (let i = 1; i < 6; i++) {
                const fundMeConnectedContract = await fundMe.connect(accounts[i])
                await fundMeConnectedContract.fund({ value: ethers.parseEther("1") })
            }
            const startingFundMeBalance = await fundMe.provider.getBalance(fundMe.address)
            const startingDeployerBalance = await fundMe.provider.getBalance(deployer)
            // Act
            const transactionResponse = await fundMe.withdraw()
            const transactionReceipt = await transactionResponse.wait(1)
            const { gasUsed, effectiveGasPrice } = transactionReceipt
            const gasCost = gasUsed.mul(effectiveGasPrice)
            const endingFundMeBalance = await fundMe.provider.getBalance(fundMe.address)
            const endingDeployerBalance = await fundMe.provider.getBalance(deployer)
            // Assert
            assert.equal(endingFundMeBalance, 0)
            assert.equal(startingFundMeBalance.add(startingDeployerBalance).toString(), endingDeployerBalance.add(gasCost).toString())
            await expect(fundMe.getFunder(0)).to.be.reverted

            for (i = 1; i < 6; i++) {
                assert.equal(await fundMe.getAddressToAmountFunded(accounts[i].address), 0)
            }
        })

        it("only allows the owner to withdraw", async () => {
            const accounts = await ethers.getSigners()
            const attacker = accounts[1]
            const attackerConnectedContract = await fundMe.connect(attacker)
            await expect(attackerConnectedContract.withdraw()).to.be.revertedWith("FundMe__NotOwner")
        })
    })
})