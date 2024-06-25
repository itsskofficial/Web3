const {assert, expect} = require("chai");
const {network, deployments, ethers} = require("hardhat");
const {developmentChains} = require("../../helper-hardhat-config");

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Random IPFS NFT Unit Tests", function () {
          let randomIPFSNFT, deployer, vrfCoordinatorV2Mock;

          beforeEach(async () => {
              accounts = await ethers.getSigners();
              deployer = accounts[0];
              await deployments.fixture(["mocks", "randomIPFSNFT"]);
              const randomIPFSNFTdeployment = await deployments.get("RandomIPFSNFT");
              const vrfCoordinatorV2Mockdeployment = await deployments.get("VRFCoordinatorV2Mock");
              randomIPFSNFT = await ethers.getContractAt(randomIPFSNFTdeployment.abi, randomIPFSNFTdeployment.address);
              vrfCoordinatorV2Mock = await ethers.getContractAt(
                  vrfCoordinatorV2Mockdeployment.abi,
                  vrfCoordinatorV2Mockdeployment.address
              );
          });

          describe("constructor", () => {
              it("sets starting values correctly", async function () {
                  const dogTokenURIZero = await randomIPFSNFT.getDogTokenURIs(
                      0
                  );
                  assert(dogTokenURIZero.includes("ipfs://"));
              });
          });

          describe("requestNFT", () => {
              it("fails if payment isn't sent with the request", async function () {
                  await expect(randomIPFSNFT.requestNFT()).to.be.revertedWithCustomError(
                      randomIPFSNFT,
                      "RandomIPFSNFT__NotEnoughETH"
                  );
              });
              it("reverts if payment amount is less than the mint fee", async function () {
                  const fee = await randomIPFSNFT.getMintFee();
                  await expect(
                      randomIPFSNFT.requestNFT({
                          value: fee - ethers.parseEther("0.001"),
                      })
                  ).to.be.revertedWithCustomError(randomIPFSNFT, "RandomIPFSNFT__NotEnoughETH");
              });
              it("emits an event and kicks off a random word request", async function () {
                  const fee = await randomIPFSNFT.getMintFee();
                  await expect(
                      randomIPFSNFT.requestNFT({value: fee.toString()})
                  ).to.emit(randomIPFSNFT, "NFTRequested");
              });
          });
          describe("fulfillRandomWords", () => {
              it("mints NFT after random number is returned", async function () {
                  await new Promise(async (resolve, reject) => {
                      randomIPFSNFT.once(
                          "NFTMinted",
                          async (tokenId, breed, minter) => {
                              try {
                                  const tokenURI = await randomIPFSNFT.tokenURI(
                                      tokenId.toString()
                                  );
                                  const tokenCounter =
                                      await randomIPFSNFT.getTokenCounter();
                                  const dogURI =
                                      await randomIPFSNFT.getDogTokenURIs(
                                          breed.toString()
                                      );
                                  assert.equal(
                                      tokenURI.toString().includes("ipfs://"),
                                      true
                                  );
                                  assert.equal(
                                      dogURI.toString(),
                                      tokenURI.toString()
                                  );
                                  assert.equal(
                                      +tokenCounter.toString(),
                                      +tokenId.toString() + 1
                                  );
                                  assert.equal(minter, deployer.address);
                                  resolve();
                              } catch (e) {
                                  console.log(e);
                                  reject(e);
                              }
                          }
                      );
                      try {
                          const fee = await randomIPFSNFT.getMintFee();
                          const requestNFTResponse =
                              await randomIPFSNFT.requestNFT({
                                  value: fee.toString(),
                              });
                          const requestNFTReceipt =
                              await requestNFTResponse.wait(1);
                          await vrfCoordinatorV2Mock.fulfillRandomWords(
                              requestNFTReceipt.logs[1].topics[1],
                              randomIPFSNFT.target
                          );
                      } catch (e) {
                          console.log(e);
                          reject(e);
                      }
                  });
              });
          });
          describe("getBreedFromChance", () => {
              it("should return pug if chance < 10", async function () {
                  const expectedValue =
                      await randomIPFSNFT.getBreedFromChance(7);
                  assert.equal(0, expectedValue);
              });
              it("should return shiba-inu if chance is between 10 - 39", async function () {
                  const expectedValue =
                      await randomIPFSNFT.getBreedFromChance(21);
                  assert.equal(1, expectedValue);
              });
              it("should return st. bernard if chance is between 40 - 99", async function () {
                  const expectedValue =
                      await randomIPFSNFT.getBreedFromChance(77);
                  assert.equal(2, expectedValue);
              });
              it("should revert if chance > 99", async function () {
                  await expect(
                      randomIPFSNFT.getBreedFromChance(100)
                  ).to.be.revertedWithCustomError(randomIPFSNFT, "RandomIPFSNFT__RangeOutOfBounds");
              });
          });
      });
