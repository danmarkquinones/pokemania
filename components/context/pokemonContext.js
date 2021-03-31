import React , {useState} from 'react'
import { getTypes } from '../helpers/types.helper';

export const PokemonContext = React.createContext();

export const PokemonContextProvider = (props) => {
    const [pokemons , setPokemons] = useState([])
    const [filters , setFilters] = useState({
        default:false,
        start:"",
        end:"",
        offset:0,
        limit:10,
        types:getTypes,
        selectedTypes:[],
        height:"",
        weight:""
    })

    return (
        <PokemonContext.Provider value={[pokemons , setPokemons,filters , setFilters]}>
            {props.children}
        </PokemonContext.Provider>
    )
}
