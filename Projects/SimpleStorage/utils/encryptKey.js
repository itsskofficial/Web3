const ethers = require("ethers") // Importing the ethers library
const fs = require("fs") // Importing the fs module for file operations
require("dotenv").config() // Importing the dotenv module to read the .env file

const main = async () => {
    // Check if the necessary environment variables are set
    if (!process.env.PRIVATE_KEY) {
        throw new Error("Environment variable PRIVATE_KEY is not set");
    }

    if (!process.env.PRIVATE_KEY_PASSWORD) {
        throw new Error("Environment variable PRIVATE_KEY_PASSWORD is not set");
    }

    // Create a new wallet instance using the private key from environment variables
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);

    // Encrypt the private key using the password from environment variables
    const encryptedJsonKey = await wallet.encrypt(
        process.env.PRIVATE_KEY_PASSWORD,
        process.env.PRIVATE_KEY
    ).catch((error) => {
        throw new Error(`Failed to encrypt private key: ${error.message}`);
    });

    // Write the encrypted key to a file
    try {
        fs.writeFileSync("./.encryptedKey.json", encryptedJsonKey);
    } catch (error) {
        throw new Error(`Failed to write encrypted key to file: ${error.message}`);
    }
}

main()
    .then(() => process.exit(0)) // Exiting the process with a success code if everything is executed successfully
    .catch(error => { console.error(error) }) // Handling and logging any errors that occur
