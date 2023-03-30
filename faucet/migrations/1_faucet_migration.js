const {artifacts} = require(truff)
const Faucet = artifacts.require("Faucet")

module.exports = function (deployer) {
    deployer.deploy(Faucet)
}
