export const generatePokemonImage = (data) => {
    let imgURL 
    imgURL = data.sprites.other["official-artwork"].front_default
    // if(data.id === 894 || data.id === 895 ){
    //     imgURL = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${data.id}.png`
    // }else if(data.id === 896){
    //     imgURL = `https://cdn.bulbagarden.net/upload/thumb/f/ff/896Glastrier.png/600px-896Glastrier.png`
    // }else if (data.id === 897){
    //     imgURL = `https://archives.bulbagarden.net/media/upload/thumb/7/7e/897Spectrier.png/600px-897Spectrier.png`
    // }else if(data.id === 898){
    //     imgURL = `https://cdn.bulbagarden.net/upload/thumb/3/3c/898Calyrex.png/600px-898Calyrex.png`
    // }else{
    //     imgURL = data.sprites.other["official-artwork"].front_default
    // }

    return imgURL
}