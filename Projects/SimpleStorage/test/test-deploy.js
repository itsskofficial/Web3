const { ethers } = require("hardhat");
const {expect, assert} = require("chai");

describe("SimpleStorage", () => {
    let contractFactory, contract

    beforeEach(async () => {
        contractFactory = await ethers.getContractFactory("SimpleStorage");
        contract = await contractFactory.deploy();
    })
    
    it("Should deploy the contract", async () => {
        expect(await contract.getAddress()).to.not.be.undefined;
    })

    it("Should start with a favourite number of 5", async () => {
        const favouriteNumber = await contract.retrieve();
        assert.equal(await favouriteNumber.toString(), "5");
    })

    it("Should update the favourite number", async () => {
        const transactionResponse = await contract.store(42);
        await transactionResponse.wait(1);
        const updatedFavouriteNumber = await contract.retrieve();
        assert.equal(await updatedFavouriteNumber.toString(), "42");
    })
})