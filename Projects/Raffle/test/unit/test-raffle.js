const { network } = require("hardhat")
const { assert, expect } = require("chai")
const { developmentChains, networkConfig } = require("../../helper-hardhat-config")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Raffle Unit Tests", function () {
        let raffle, vrfCoordinatorV2Mock, entranceFee, deployer, interval
        const chainId = network.config.chainId
        
        beforeEach(async () => {
            deployer = (await getNamedAccounts()).deployer
            await deployments.fixture(["all"])
            const raffleDeployment = await deployments.get("Raffle")
            const vrfCoordinatorV2MockDeployment = await deployments.get("VRFCoordinatorV2Mock")
            raffle = await ethers.getContractAt(raffleDeployment.abi, raffleDeployment.address)
            vrfCoordinatorV2Mock = await ethers.getContractAt(vrfCoordinatorV2MockDeployment.abi, vrfCoordinatorV2MockDeployment.address)
            entranceFee = await raffle.getEntranceFee()
            interval = await raffle.getInterval()
        })

        describe("constructor", () => {
            it("initializes the raffle correctly", async () => {
                const raffleState = await raffle.getRaffleState()
                const interval = await raffle.getInterval()
                assert(raffleState.toString() == "0")
                assert(interval.toString() == networkConfig[chainId]["interval"])
            })
        })

        describe("enterRaffle", () => {
            it("reverts when you don't send enough ETH", async () => {
                await expect(raffle.enterRaffle()).to.be.revertedWithCustomError(raffle, "Raffle__NotEnoughETHEntered")
            })

            it("records players when they enter", async () => {
                await raffle.enterRaffle({ value: entranceFee })
                const playerFromContract = await raffle.getPlayer(0)
                assert(playerFromContract == deployer)
            })

            it("emits event on enter", async () => {
                await expect(raffle.enterRaffle({ value: entranceFee })).to.emit(raffle, "RaffleEnter")
            })
            
            it("does not allow entrance when raffle is calculating", async () => {
                await raffle.enterRaffle({ value: entranceFee })
                await network.provider.send("evm_increaseTime", [interval.toNumber() + 1])
                await network.provider.send("evm_mine", [])
                await raffle.performUpkeep([])
                await expect(raffle.enterRaffle({ value: entranceFee })).to.be.revertedWithCustomError(raffle, "Raffle__NotOpen")
            })
        })

        describe("checkUpkeep", () => {
            it("returns false if people haven't sent any ETH", async () => {
                await network.provider.send("evm_increaseTime", [interval.toNumber() + 1])
                await network.provider.send("evm_mine", [])
                const { upkeepNeeded } = await raffle.callStatic.checkUpkeep([])
                assert.equal(upkeepNeeded, false)
            })

            it("returns false if raffle isn't open", async () => {
                await raffle.enterRaffle({ value: entranceFee })
                await network.provider.send("evm_increaseTime", [interval.toNumber() + 1])
                await network.provider.send("evm_mine", [])
                await raffle.performUpkeep([]) 
                const raffleState = await raffle.getRaffleState()
                const { upkeepNeeded } = await raffle.callStatic.checkUpkeep([])
                assert.equal(raffleState.toString(), "1")
                assert.equal(upkeepNeeded, false)
            })

            it("returns false if not enough time has passed", async () => {
                await raffle.enterRaffle({ value: entranceFee })
                const { upkeepNeeded } = await raffle.callStatic.checkUpkeep([])
                assert.equal(upkeepNeeded, false)
            })

            it("returns true if enough time has passed, has players, eth, and is open", async () => {
                await raffle.enterRaffle({ value: entranceFee })
                await network.provider.send("evm_increaseTime", [interval.toNumber() + 1])
                await network.provider.send("evm_mine", [])
                const { upkeepNeeded } = await raffle.callStatic.checkUpkeep([])
                assert.equal(upkeepNeeded, true)
            })
        })

        describe("performUpkeep", () => {
            it("it can only run if checkUpkeep is true", async () => {
                await raffle.enterRaffle({ value: entranceFee })
                await network.provider.send("evm_increaseTime", [interval.toNumber() + 1])
                await network.provider.send("evm_mine", [])
                const transactionResponse = await raffle.performUpkeep([])
                assert(transactionResponse)
            })

            it("reverts when checkUpkeep is false", async () => {
                await expect(raffle.performUpkeep([])).to.be.revertedWithCustomError(raffle, "Raffle__UpkeepNotNeeded")
            })

            it("updates the raffle state, emits an event, and calls the vrf coordinator", async () => {
                await raffle.enterRaffle({ value: entranceFee })
                await network.provider.send("evm_increaseTime", [interval.toNumber() + 1])
                await network.provider.send("evm_mine", [])
                const transactionResponse = await raffle.performUpkeep([])
                const transactionReceipt = await transactionResponse.wait(1)
                const raffleState = await raffle.getRaffleState()
                const requestId = BigInt(transactionReceipt.logs[1].topics[0]);
                assert(requestId.toNumber() > 0)
                assert(raffleState.toString() == "1")
            })
        })

        describe("fulfillRandomWords", () => {
            beforeEach(async () => {
                await raffle.enterRaffle({ value: entranceFee })
                await network.provider.send("evm_increaseTime", [interval.toNumber() + 1])
                await network.provider.send("evm_mine", [])
            })

            it("can only be called after performUpkeep", async () => {
                await expect(vrfCoordinatorV2Mock.fulfillRandomWords(0, raffle.address)).to.be.revertedWith("nonexistent request")
                await expect(vrfCoordinatorV2Mock.fulfillRandomWords(1, raffle.address)).to.be.revertedWith("nonexistent request")
            })

            it("picks a winner, resets the lottery, and sends money", async () => {
                const additionalEntrants = 3
                const startingAccountIndex = 1
                const accounts = await ethers.getSigners()
                for (let i = startingAccountIndex; i < startingAccountIndex + additionalEntrants; i++) {
                    await raffle.connect(accounts[i]).enterRaffle({ value: entranceFee })
                }
                const startingTimeStamp = await raffle.getLatestTimeStamp()

                await new Promise(async (resolve, reject) => {
                    raffle.once("WinnerPicked", async () => {
                        console.log("Found the winner!")
                        try {
                            const recentWinner = await raffle.getRecentWinner()
                            const raffleState = await raffle.getRaffleState()
                            const endingTimeStamp = await raffle.getLatestTimeStamp()
                            const numPlayers = await raffle.getNumPlayers()
                            const winnerEndingBalance = await accounts[1].getBalance()
                            console.log(recentWinner)
                            assert.equal(numPlayers.toString(), "0")
                            assert.equal(raffleState, 0)
                            assert(endingTimeStamp > startingTimeStamp)
                            assert.equal(winnerEndingBalance.toString(), (winnerStartingBalance + (entranceFee * additionalEntrants) + (entranceFee)).toString())
                        } catch (e) {
                            reject(e)
                        }
                        resolve()
                    })
                    
                    const transactionResponse = await raffle.performUpkeep([])
                    const transactionReceipt = await transactionResponse.wait(1)
                    const winnerStartingBalance = await accounts[1].getBalance()
                    await vrfCoordinatorV2Mock.fulfillRandomWords(BigInt(transactionReceipt.logs[1].topics[0]), raffle.address)
                })
            })
        })
    })