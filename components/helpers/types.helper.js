
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

export const getTypes = [
    {id:"1" , isSelected:false, value:"normal" , bgColor:generateTypeColor("normal") , icon:generateTypeIcon("normal")},
    {id:"2" , isSelected:false, value:"poison" , bgColor:generateTypeColor("poison") , icon:generateTypeIcon("poison")},
    {id:"3" , isSelected:false, value:"fighting" , bgColor:generateTypeColor("fighting") , icon:generateTypeIcon("fighting")},
    {id:"4" , isSelected:false, value:"flying" , bgColor:generateTypeColor("flying") , icon:generateTypeIcon("flying")},
    {id:"5" , isSelected:false, value:"ground" , bgColor:generateTypeColor("ground") , icon:generateTypeIcon("ground")},
    {id:"6" , isSelected:false, value:"bug" , bgColor:generateTypeColor("bug") , icon:generateTypeIcon("bug")},
    {id:"7" , isSelected:false, value:"ghost" , bgColor:generateTypeColor("ghost") , icon:generateTypeIcon("ghost")},
    {id:"8" , isSelected:false, value:"steal" , bgColor:generateTypeColor("steal") , icon:generateTypeIcon("steal")},
    {id:"9" , isSelected:false, value:"fire" , bgColor:generateTypeColor("fire") , icon:generateTypeIcon("fire")},
    {id:"10" , isSelected:false, value:"water" , bgColor:generateTypeColor("water") , icon:generateTypeIcon("water")},
    {id:"11" , isSelected:false, value:"rock" , bgColor:generateTypeColor("rock") , icon:generateTypeIcon("rock")},
    {id:"12" , isSelected:false, value:"grass" , bgColor:generateTypeColor("grass") , icon:generateTypeIcon("grass")},
    {id:"13" , isSelected:false, value:"electric" , bgColor:generateTypeColor("electric") , icon:generateTypeIcon("electric")},
    {id:"14" , isSelected:false, value:"psychic" , bgColor:generateTypeColor("psychic") , icon:generateTypeIcon("psychic")},
    {id:"15" , isSelected:false, value:"ice" , bgColor:generateTypeColor("ice") , icon:generateTypeIcon("ice")},
    {id:"16" , isSelected:false, value:"dragon" , bgColor:generateTypeColor("dragon") , icon:generateTypeIcon("dragon")},
    {id:"17" , isSelected:false, value:"dark" , bgColor:generateTypeColor("dark") , icon:generateTypeIcon("dark")},
    {id:"18" , isSelected:false, value:"fairy" , bgColor:generateTypeColor("fairy") , icon:generateTypeIcon("fairy")},
    {id:"19" , isSelected:false, value:"shadow" , bgColor:generateTypeColor("shadow") , icon:generateTypeIcon("shadow")},
    {id:"20" , isSelected:false, value:"undefined" , bgColor:generateTypeColor("undefined") , icon:generateTypeIcon("undefined")},
]