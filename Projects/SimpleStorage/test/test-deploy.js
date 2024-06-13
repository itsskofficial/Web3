const { ethers } = require("hardhat");
const {expect, assert} = require("chai");

describe("SimpleStorage", () => {
    let contractFactory, contract

    beforeEach(async () => {
        contractFactory = await ethers.getContractFactory("SimpleStorage");
        contract = await contractFactory.deploy();
    })
    
    it("Should deploy the contract", async () => {
        expect(contract.address).to.not.be.undefined;
    })

    it("Should start with a favourite number of 0", async () => {
        assert.equal(await contract.retrieve().toString(), "0");
    })

    it("Should update the favourite number", async () => {
        const transactionResponse = await contract.store(42);
        await transactionResponse.wait(1);
        assert.equal(await contract.retrieve().toString(), "42");
    })
})