import React , {useContext} from "react";
import { FlatList, Text, View ,TouchableOpacity, Image } from "react-native";
import { AsyncStoreContext } from "../../context/asyncStorageContext";
import {favoriteStyles} from "./favoriteStyle";
import {generatePokemonImage} from "../../helpers/pokemonImages.helper"
import {generateTypeIcon} from "../../helpers/types.helper";
import { globalStyles } from "../../../assets/styles/globalStyle";
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoriteLists = (props) => {

    const {navigation} = props
    const [favorites , setFavorites] = useContext(AsyncStoreContext)

    const removeFromFavorite = (pokemon) => {
        const filtered = favorites.filter(fav=>fav.id!==pokemon.id)
        setFavorites(filtered)
        AsyncStorage.setItem("favoritesPokemons" , JSON.stringify(filtered))
    }

    return(
        <View style={{flex:1}}>
            <FlatList
                data={favorites.sort(function(a, b){return a["id"]-b["id"]})}
                keyExtractor={(item,i)=>item.id.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({item})=>{
                    return(
                        <View style={favoriteStyles.card}>
                            <Image 
                                style={favoriteStyles.image}
                                source={{uri : generatePokemonImage(item)}} 
                            />
                            <View style={{flexDirection:"column" , flex:1}}>
                                <Text style={favoriteStyles.pokemonName}>#{item.id} {item.name}</Text>

                                <View style={favoriteStyles.pokemonTypes}>
                                {item.types.map((type,i)=>
                                    <View key={i} style={{margin:5}}>
                                        <Image 
                                            style={{width:20,height:20}} 
                                            source={{uri:generateTypeIcon(type.type.name)
                                        }}/>
                                    </View>
                                )}
                                </View>
                            </View>

                            <View
                                style={{
                                    flexDirection:"row",
                                    alignItems:"center"
                                }}
                            >
                                <TouchableOpacity onPress={()=>removeFromFavorite(item)}>
                                    <View style={favoriteStyles.actions}>
                                        <MaterialIcons name="delete" color="#fff" size={20}/>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={()=>navigation.navigate('PokemonSingle' , item)}>
                                    <View style={favoriteStyles.actions}>
                                        <MaterialIcons name="keyboard-arrow-right" color="#fff" size={20}/>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                }}
            />
        </View>
    )
}

export default FavoriteLists