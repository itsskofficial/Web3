const truncateString = (fullString, length) => {
    if (fullString.length <= length) 
        return fullString

    const separator = "..."
    let separatorLength = separator.length
    const charsToShow = length - separatorLength
    const frontChars = Math.ceil(charsToShow / 2)
    const backChars = Math.floor(charsToShow / 2)

    return (fullString.substring(0, frontChars) + separator + fullString.substring(fullString.length - backChars))
}

export default truncateString