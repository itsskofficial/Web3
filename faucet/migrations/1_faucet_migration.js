const artifact
const Faucet = artifact.require("Faucet")

module.exports = function (deployer) {
    deployer.deploy(Faucet)
}
