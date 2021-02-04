
export const generateTypeIcon = (type) => {
    let iconUrl = ""
    switch(type) {
        case "normal":
            iconUrl = "https://static.wikia.nocookie.net/pokemongo/images/4/43/Icon_Normal.png"
            break;
        case "poison":
            iconUrl = "https://static.wikia.nocookie.net/pokemongo/images/2/26/Icon_Poison.png"
            break;
        case "fighting":
            iconUrl = "https://static.wikia.nocookie.net/pokemongo/images/f/f0/Icon_Fighting.png"
            break;
        case "flying":
            iconUrl = "https://static.wikia.nocookie.net/pokemongo/images/b/b0/Icon_Flying.png"
            break;
        case "ground":
            iconUrl = "https://static.wikia.nocookie.net/pokemongo/images/7/71/Icon_Ground.png"
            break;
        case "bug":
            iconUrl = "https://static.wikia.nocookie.net/pokemongo/images/8/88/Icon_Bug.png"
            break;
        case "ghost":
            iconUrl = "https://static.wikia.nocookie.net/pokemongo/images/7/7d/Icon_Ghost.png"
            break;
        case "steel":
            iconUrl = "https://static.wikia.nocookie.net/pokemongo/images/3/38/Icon_Steel.png"
            break;
        case "fire":
            iconUrl = "https://static.wikia.nocookie.net/pokemongo/images/0/0a/Icon_Fire.png"
            break;
        case "water":
            iconUrl = "https://static.wikia.nocookie.net/pokemongo/images/6/65/Icon_Water.png"
            break;
        case "rock":
            iconUrl = "https://static.wikia.nocookie.net/pokemongo/images/5/57/Icon_Rock.png"
            break;
        case "grass":
            iconUrl = "https://static.wikia.nocookie.net/pokemongo/images/0/0a/Icon_Grass.png"
            break;
        case "electric":
            iconUrl = "https://static.wikia.nocookie.net/pokemongo/images/1/1c/Icon_Electric.png"
            break;
        case "psychic":
            iconUrl = "https://static.wikia.nocookie.net/pokemongo/images/c/ce/Icon_Psychic.png"
            break;
        case "ice":
            iconUrl = "https://static.wikia.nocookie.net/pokemongo/images/5/52/Icon_Ice.png"
            break;
        case "dragon":
            iconUrl = "https://static.wikia.nocookie.net/pokemongo/images/d/d4/Icon_Dragon.png"
            break;
        case "dark":
            iconUrl = "https://static.wikia.nocookie.net/pokemongo/images/e/e9/Icon_Dark.png"
            break;
        case "fairy":
            iconUrl = "https://static.wikia.nocookie.net/pokemongo/images/7/7f/Icon_Fairy.png"
            break;
        case "shadow":
            iconUrl = "https://static.wikia.nocookie.net/pokemongo/images/7/76/Icon_Shadow_Pok%C3%A9mon.png"
            break;
        default:
            iconUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Icon-round-Question_mark.svg/600px-Icon-round-Question_mark.svg.png"
            break;
    }
    return iconUrl
}

export const generateTypeColor = (type) => {
    let color = ""
    switch(type) {
        case "normal":
            color = "#A8A878"
            break;
        case "poison":
            color = "#A040A0"
            break;
        case "fighting":
            color = "#C03028"
            break;
        case "flying":
            color = "#A890F0"
            break;
        case "ground":
            color = "#E0C068"
            break;
        case "bug":
            color = "#A8B820"
            break;
        case "ghost":
            color = "#705898"
            break;
        case "steel":
            color = "#B8B8D0"
            break;
        case "fire":
            color = "#F08030"
            break;
        case "water":
            color = "#6890F0"
            break;
        case "rock":
            color = "#B8A038"
            break;
        case "grass":
            color = "#78C850"
            break;
        case "electric":
            color = "#F8D030"
            break;
        case "psychic":
            color = "#F85888"
            break;
        case "ice":
            color = "#98D8D8"
            break;
        case "dragon":
            color = "#7038F8"
            break;
        case "dark":
            color = "#705848"
            break;
        case "fairy":
            color = "#EE99AC"
            break;
        case "shadow":
            color = "gray"
            break;
        default:
            color = "#68A090"
            break;
    }
    return color
}