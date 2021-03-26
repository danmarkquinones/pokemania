 
export const checkInFavorites = (pokemon , lists) => {
    if(lists){
        return !lists.some(elem => elem.name === pokemon.name)
    }else{
        return true
    }
}