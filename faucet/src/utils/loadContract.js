import contract from '@truffle/contract'

const loadContract = async (name, provider) => {
    const res = await fetch(`/contracts/${name}.json`)
    const Artifact = await res.json()
    return contract(Artifact)
}

export default loadContract