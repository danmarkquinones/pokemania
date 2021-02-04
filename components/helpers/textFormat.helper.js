export const formatWords = (word) => {
    let formatted = word
    formatted = formatted.split("-")
    formatted = formatted.join(" ")
    return formatted
}

export const formatPokemonName = (word) => {
    let formatted = word
    formatted = formatted.split("-")
    formatted[1] = `(${formatted[1]})`.toUpperCase()
    formatted = formatted.join(" ")
    console.log(formatted)
    return formatted
}
