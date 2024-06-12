const ethers = require("ethers") // Importing the ethers library
const fs = require("fs") // Importing the fs module for file operations
const path = require("path")
require("dotenv").config({ path: path.resolve(__dirname, "../.env") }); // Importing the dotenv module to read the .env file

const main = async () => {
    try {
        // Create a provider using the RPC URL from the environment variables
        const provider = new ethers.JsonRpcProvider(process.env.RPC_URL)

        // Read the encrypted key file
        const encryptedJson = fs.readFileSync("./encryptedKey.json", "utf8")

        // Decrypt the wallet using the encrypted key and password from the environment variables
        let wallet = ethers.Wallet.fromEncryptedJsonSync(encryptedJson, process.env.PRIVATE_KEY_PASSWORD)

        // Connect the wallet to the provider
        wallet = wallet.connect(provider)

        // Read the contract ABI and bytecode files
        const abi = fs.readFileSync("contracts/artifacts/contracts_SimpleStorage_sol_SimpleStorage.abi", "utf8")
        const bin = fs.readFileSync("contracts/artifacts/contracts_SimpleStorage_sol_SimpleStorage.bin", "utf8")

        // Create a contract factory using the ABI, bytecode, and wallet
        const contractFactory = new ethers.ContractFactory(abi, bin, wallet)

        console.log("Deploying, please wait...")

        // Deploy the contract with a gas limit of 1000000
        const contract = await contractFactory.deploy({gasLimit: 1000000})

        // Check if the contract deployment was successful
        if(!contract) {
            throw new Error("Contract deployment failed.")
        }

        // Wait for the deployment transaction to be mined and get the transaction receipt
        let transactionReceipt = await contract.deploymentTransaction().wait(1)

        console.log("Contract deployed, here's your receipt: ", transactionReceipt)
        console.log("Contract address: ", await contract.getAddress())

        // Retrieve the favourite number from the contract
        const favouriteNumber = await contract.retrieve()
        console.log("Favourite number: ", favouriteNumber.toString())

        // Store a new number in the contract
        const transactionResponse = await contract.store(3)
        transactionReceipt = await transactionResponse.wait(1);
        console.log("Number stored, here's your receipt: ", transactionReceipt);

        // Retrieve the updated favourite number from the contract
        const updatedFavouriteNumber = await contract.retrieve();
        console.log("Updated favourite number: ", updatedFavouriteNumber.toString());
    } catch (error) {
        console.error(error)
    }
}

main()
    .then(() => process.exit(0))
    .catch(error => { console.error(error)})