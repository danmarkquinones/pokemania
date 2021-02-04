import React from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { MaterialIcons } from '@expo/vector-icons';
import {navigationStyles} from '../routes/navigationStyles'

const CustomHeader = (props) => {
    const {title , navigation} = props
    return (
        <View style={navigationStyles.header}>
            {/* <Text style={navigationStyles.headerText}>{title}</Text> */}
            <Text style={navigationStyles.headerText}>POKEMANIA</Text>
            <TouchableOpacity style={navigationStyles.headerIcon} onPress={()=>navigation.navigate("PokemonSearch")}>
                <MaterialIcons  name='search' size={18} color='black' />
            </TouchableOpacity>
        </View>
    )
}

export default CustomHeader