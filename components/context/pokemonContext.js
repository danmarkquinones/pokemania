import React , {useState} from 'react'

export const PokemonContext = React.createContext();

export const PokemonContextProvider = (props) => {
    const [pokemons , setPokemons] = useState([])

    return (
        <PokemonContext.Provider value={[pokemons , setPokemons]}>
            {props.children}
        </PokemonContext.Provider>
    )
}
