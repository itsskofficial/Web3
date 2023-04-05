import contract from '@truffle/contract'

const loadContract = async (name, provider) => {
    const res = await fetch(`/contracts/${name}.json`)
    const Artifact = await res.json()
    const abstraction = contract(Artifact)
    abstraction.setProvider(provider)
    const deployedContract = await abstraction.deployed()
}

export default deploye