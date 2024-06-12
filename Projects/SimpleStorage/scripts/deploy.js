const { ethers } = require("hardhat") // Import the ethers library from hardhat

const main = async () => {
    // Get the contract factory for SimpleStorage
    const contractFactory = await ethers.getContractFactory("SimpleStorage");
    console.log("Deploying contract...");

    // Deploy the contract
    const contract = await contractFactory.deploy();

    // Check if the contract deployment was successful
    if (!contract) {
        throw new Error("Contract deployment failed.");
    }

    // Wait for the deployment transaction to be mined and get the transaction receipt
    let transactionReceipt = await contract.deploymentTransaction().wait(1);

    console.log("Contract deployed, here's your receipt: ", transactionReceipt);
    console.log("Contract address: ", await contract.getAddress());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })