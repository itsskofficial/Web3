const loadContract = (name) => {
    await fetch('/contracts/${}')
}