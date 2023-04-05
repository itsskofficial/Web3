const loadContract = async (name) => {
    const res = await fetch(`/contracts/${name}.json`)
    const Artifact = await res.json()
    return {
        contract : Artifac
}

export default loadContract