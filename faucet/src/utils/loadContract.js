const loadContract = (name) => {
    const res = await fetch(`/contracts/${name}.json`)
    const Artifact = await res.json()
    return {
        contrac
    }
}