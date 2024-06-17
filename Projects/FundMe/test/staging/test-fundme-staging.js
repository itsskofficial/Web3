const { getNamedAccounts, ethers, deployments, network } = require("hardhat")
const { assert, expect } = require("chai")
const { developmentChains } = require("../../helper-hardhat-config")

developmentChains.includes(network.name) ?
    describe.skip :
    describe("FundMe", async () => {
        let fundMe, deployer

        beforeEach(async () => {
            deployer = (await getNamedAccounts()).deployer
            const fundMeDeployment = await deployments.get("FundMe")
            fundMe = await ethers.getContractAt(fundMeDeployment.abi, fundMeDeployment.address)

        })

        it("allows people to fund and withdraw", async () => {
            await fundMe.fund({ value: ethers.parseEther("1") })
            await fundMe.withdraw()
            const endingBalance = await ethers.provider.getBalance(fundMe.target)
            assert.equal(endingBalance.toString(), "0")
        })
    })