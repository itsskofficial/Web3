const { ethers, run, network } = require("hardhat"); // Import the ethers library from hardhat
const path = require("path"); // Importing the path module to resolve the path to the .env file
require("dotenv").config({ path: path.resolve(__dirname, "../.env") }); // Importing the dotenv module to read the .env file

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
    let transactionReceipt = await contract.deploymentTransaction().wait(3);

    console.log("Contract deployed, here's your receipt: ", transactionReceipt);
    console.log("Contract address: ", await contract.getAddress());

    // Verify the contract on Etherscan
    if (network.name === "sepolia" && process.env.ETHERSCAN_API_KEY) {
        await verify(await contract.getAddress(), []);
    } else {
        console.log("Contract can't be verified. Please verify it manually.")
    }

    let favouriteNumber = await contract.retrieve()
    console.log("Current favourite number: ", favouriteNumber.toString());

    // Set the favourite number to 42
    const transactionResponse = await contract.store(42)
    transactionReceipt = await transactionResponse.wait(1);
    console.log("Number stored, here's your receipt: ", transactionReceipt);

    // Retrieve the updated favourite number from the contract
    const updatedFavouriteNumber = await contract.retrieve();
    console.log(
        "Updated favourite number: ",
         updatedFavouriteNumber.toString()
    );
}

const verify = async (contractAddress, args) => {
    console.log("Verifying contract...");
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        });
    } catch (error) {
        if (error.message.toLowerCase().includes("already verified")) {
            console.log("Contract already verified.");
        } else {
            console.error("Error verifying contract:", error);
        }
    }
}
    

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })