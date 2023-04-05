const loadContract = async (name) => {
    const res = await fetch(`/contracts/${name}.json`)
    const Artifact = await res.json()
    return contracts_build_directory(Artif)
}

export default loadContract