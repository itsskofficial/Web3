const artifacts = require("truffle")
import artifacts
const Faucet = artifacts.require("Faucet")

module.exports = function (deployer) {
    deployer.deploy(Faucet)
}
