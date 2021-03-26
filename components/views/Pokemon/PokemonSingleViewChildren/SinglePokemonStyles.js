import { StyleSheet } from 'react-native';
import {generateTypeColor} from "../../../helpers/types.helper"

export const singlePokemonStyles = (pokemon) => StyleSheet.create({
    inactiveEvolve :{
        flexDirection:"column",
        alignItems:"center",
        borderWidth:0,
        padding: 5,
        width:70,
    },
    activeEvolve:{
        flexDirection:"column",
        alignItems:"center",
        borderWidth:2,
        padding: 5,
        width:70,
        borderRadius : 10,
        borderColor:generateTypeColor(pokemon.types[0].type.name)
    }
})
