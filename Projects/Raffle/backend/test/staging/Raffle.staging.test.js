const { network } = require("hardhat")
const { assert, expect } = require("chai")
const { developmentChains } = require("../../helper-hardhat-config")

developmentChains.includes(network.name)
    ? describe.skip
    : describe("Raffle Unit Tests", function () {
        let raffle, entranceFee, deployer
        
        beforeEach(async () => {
            deployer = (await getNamedAccounts()).deployer
            const raffleDeployment = await deployments.get("Raffle")
            raffle = await ethers.getContractAt(raffleDeployment.abi, raffleDeployment.address)
            entranceFee = await raffle.getEntranceFee()
        })

        describe("fullfillRandomWords", () => {
            it("works with live Chainlink Keepers and Chainlink VRF, we get a random winner", async () => {
                const startingTimeStamp = await raffle.getLatestTimeStamp()
                const accounts = await ethers.getSigners()

                await new Promise(async (resolve, reject) => {
                    raffle.once("WinnerPicked", async () => {
                        console.log("Found the winner!")
                        try {
                            const recentWinner = await raffle.getRecentWinner()
                            const raffleState = await raffle.getRaffleState()
                            const winnerEndingBalance = await accounts[0].getBalance()
                            const endingTimeStamp = await raffle.getLatestTimeStamp()
                            await expect(raffle.getPlayer(0)).to.be.reverted
                            assert.equal(recentWinner.toString(), accounts[0].address)
                            assert.equal(raffleState, 0)
                            assert.equal(winnerEndingBalance.toString(), (winnerStartingBalance + entranceFee).toString())
                            assert.equal(endingTimeStamp > startingTimeStamp)
                            resolve()
                        } catch (e) {
                            console.error(e)
                            reject()
                        }
                    })
                })
                await raffle.enterRaffle({ value: entranceFee })
                const winnerStartingBalance = await accounts[0].getBalance()
            })
        })
    })
