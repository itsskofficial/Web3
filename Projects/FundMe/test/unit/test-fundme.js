const { deployments, ethers, getNamedAccounts } = require("hardhat")
const { assert, expect } = require("chai")

describe("FundMe", async () => {
    let fundMe, deployer, mockV3Aggregator

    beforeEach(async () => {
        deployer = (await getNamedAccounts()).deployer
        await deployments.fixture(["all"])
        const fundMeDeployment = await deployments.get("FundMe");
        const mockV3AggregatorDeployment = await deployments.get("MockV3Aggregator");

        fundMe = await ethers.getContractAt(fundMeDeployment.abi, fundMeDeployment.address)
        mockV3Aggregator = await ethers.getContractAt(mockV3AggregatorDeployment.abi, mockV3AggregatorDeployment.address)
    })

    describe("constructor", async () => {
        it("sets the aggregator address correctly", async () => {
            const response = await fundMe.getPriceFeed()
            assert.equal(response, mockV3Aggregator.target)
        })
    })

    describe("fund", () => {
        it("fails if you don't send enough ETH", async () => {
            await expect(fundMe.fund()).to.be.revertedWithCustomError(fundMe, "FundMe__NotEnoughETH")
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

    describe("withdraw", () => {
        beforeEach(async () => {
            await fundMe.fund({ value: ethers.parseEther("1") })
        })

        it("withdraw ETH from a single funder", async () => {
            // Arrange
            const startingFundMeBalance = await ethers.provider.getBalance(fundMe.target) 
            const startingDeployerBalance = await ethers.provider.getBalance(deployer)  
            // Act
            const transactionResponse = await fundMe.withdraw()
            const transactionReceipt = await transactionResponse.wait(1)
            const { gasUsed, gasPrice } = transactionReceipt
            const gasCost = gasUsed * gasPrice
            const endingFundMeBalance = await ethers.provider.getBalance(fundMe.target)
            const endingDeployerBalance = await ethers.provider.getBalance(deployer)  
            // Assert
            assert.equal(endingFundMeBalance, 0n)
            assert.equal(startingFundMeBalance + startingDeployerBalance, endingDeployerBalance + gasCost)
        })

        it("allows us to withdraw with multiple getFunder", async () => {
            // Arrange
            const accounts = await ethers.getSigners()
            for (let i = 1; i < 6; i++) {
                const fundMeConnectedContract = await fundMe.connect(accounts[i])
                await fundMeConnectedContract.fund({ value: ethers.parseEther("1") })
            }
            const startingFundMeBalance = await ethers.provider.getBalance(fundMe.target)
            const startingDeployerBalance = await ethers.provider.getBalance(deployer)
            // Act
            const transactionResponse = await fundMe.withdraw()
            const transactionReceipt = await transactionResponse.wait(1)
            const { gasUsed, gasPrice } = transactionReceipt
            const gasCost = gasUsed * gasPrice
            const endingFundMeBalance = await ethers.provider.getBalance(fundMe.target)
            const endingDeployerBalance = await ethers.provider.getBalance(deployer)
            // Assert
            assert.equal(endingFundMeBalance, 0n)
            assert.equal(startingFundMeBalance + startingDeployerBalance, endingDeployerBalance + gasCost)
            await expect(fundMe.getFunder(0)).to.be.reverted;

            for (i = 1; i < 6; i++) {
                assert.equal(await fundMe.getAddressToAmountFunded(accounts[i]), 0)
            }
        })

        it("only allows the owner to withdraw", async () => {
            const accounts = await ethers.getSigners()
            const attacker = accounts[1]
            const attackerConnectedContract = await fundMe.connect(attacker)
            await expect(attackerConnectedContract.withdraw()).to.be.revertedWithCustomError(fundMe, "FundMe__NotOwner")
        })
    })
})