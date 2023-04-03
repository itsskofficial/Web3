//es-lint ignore
const Faucet = artifacts.require("Faucet")

module.exports = function (deployer) {
    deployer.deploy(Faucet)
}
