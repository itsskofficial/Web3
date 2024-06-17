<br/>
<p align="center">
  <h3 align="center">SimpleStorage</h3>

  <p align="center">
    A SimpleStorage project using Hardhat
    <br/>
    <br/>
    <a href="https://github.com/itsskofficial/Web3">View Demo</a>
    .
    <a href="https://github.com/itsskofficial/Web3/issues">Report Bug</a>
    .
    <a href="https://github.com/itsskofficial/Web3/issues">Request Feature</a>
  </p>
</p>
  

![License](https://img.shields.io/github/license/itsskofficial/Web3)

Table Of Contents
-----------------

*   [About the Project](#about-the-project)
*   [Built With](#built-with)
*   [Getting Started](#getting-started)
    *   [Prerequisites](#prerequisites)
    *   [Installation](#installation)
*   [Usage](#usage)
*   [Contributing](#contributing)
*   [License](#license)
*   [Authors](#authors)
*   [Acknowledgements](#acknowledgements)

About The Project
-----------------

SimpleStorage is a blockchain project demonstrating how to use Hardhat for Ethereum smart contract development. This project includes a simple storage contract where users can store and retrieve a single integer value. It is an excellent starting point for learning about Ethereum development and smart contract testing with Hardhat.

Built With
----------

This section lists major frameworks and tools used to build the project. Here are a few examples:

*   [Hardhat](https://hardhat.org/)
*   [Solidity](https://soliditylang.org/)
*   [Ethers.js](https://docs.ethers.io/v5/)
*   [Node.js](https://nodejs.org/)

Getting Started
---------------

To get a local copy up and running, follow these steps.

### Prerequisites

Ensure you have Node.js and npm installed.

*   **Node.js and npm:**
    
    Install Node.js and npm from the [official Node.js website](https://nodejs.org/).
    
    ```sh   
    # Verify the installation 
    node -v 
    npm -v
    ```

    

### Installation

1.  **Clone the repo**
    
    ```sh
    git clone https://github.com/itsskofficial/Web3.git
    ```
    
2.  **Navigate to the project directory**
    
    ```sh
    cd Projects/SimpleStorage
    ```
    
3.  **Install NPM packages**
    
    ```sh
    npm install
    ```
    
4.  **Compile the smart contracts**
    
    ```sh
    npx hardhat compile
    ```
    

Usage
-----

SimpleStorage allows you to store and retrieve an integer value on the Ethereum blockchain. To interact with the contract, you can use the Hardhat console or write scripts to deploy and call the contract methods.

### Running Tests

To run the tests included in the project, use the following command:

```sh
npx hardhat test
```

### Deploying the Contract

To deploy the SimpleStorage contract to a local blockchain, use:

```sh
npx hardhat run scripts/deploy.js --network localhost
```

For deployment to testnets or the mainnet, ensure you configure your network settings in `hardhat.config.js`.

Contributing
------------

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement". Don't forget to give the repository a star! Thanks again!

### Creating A Pull Request

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

License
-------

Distributed under the MIT License. See [LICENSE](https://github.com/itsskofficial/Web3/blob/main/LICENSE.md) for more information.

Acknowledgements
----------------

*   [FreeCodeCamp](https://www.freecodecamp.org/)
*   [Hardhat Documentation](https://hardhat.org/getting-started/)
*   [Ethers.js Documentation](https://docs.ethers.io/v6/)