import React , {useState , useEffect} from "react"
import { View , Text } from "react-native"
import PokemonLists from "./views/Pokemon/PokemonLists"
import {globalStyles} from "../assets/styles/globalStyle"

const Home = (props) => {
    return(
        <View style={globalStyles.container}>
            <Text>POKEDEX</Text>
            <PokemonLists/>
        </View>
    )
}

export default Home