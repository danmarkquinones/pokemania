import React , {useEffect , useState} from "react";
import { Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import axios from "axios";
import { formatPokemonName } from "../../../helpers/textFormat.helper";
import { FlatList } from "react-native-gesture-handler";
import {singlePokemonStyles} from "./SinglePokemonStyles";
import Fallbacks from "../../../shared_components/Fallbacks";
import NoImage from "../../../shared_components/NoImage";

const Forms = (props) => {
    const {pokemon , forms , navigation} = props
    const [pokemonForms,setPokemonForms] = useState([])
    const [loading,setLoading] = useState(false)
    
    useEffect(() => {
        setLoading(true)
        // if(forms){
            let formsArr = []
            forms.forEach((el)=>{
                if(!el.is_default){
                    axios.get(el.pokemon.url)
                    .then(res => {
                        
                        formsArr.push(res.data)
                        if(formsArr.length === forms.length - 1){
                            setPokemonForms(formsArr)
                        }
                    }).catch(e => console.log('FETCH FAILED',e))
                }else{
                    setPokemonForms([])
                    setLoading(false)
                }
            })
        // }
    }, [forms])

    console.log("FORMS" , pokemonForms)
    return (
        <View>
            {loading ? 
                <View><Text>Loading...</Text></View>
            :pokemonForms.length?
                <SafeAreaView style={{alignItems:"center"}}>
                    <FlatList
                        data={pokemonForms}
                        keyExtractor={(item,i)=>item.id.toString()}
                        numColumns={3}
                        renderItem={({item})=>{
                            return(
                                <TouchableOpacity style={{marginHorizontal:10}} onPress={()=>navigation.navigate('PokemonSingle' , item)}>
                                    <View 
                                        style={[
                                            pokemon.name === item.name ? singlePokemonStyles(pokemon).activeEvolve : singlePokemonStyles(pokemon).inactiveEvolve,
                                            {width:100}
                                        ]}
                                    >
                                        {item.sprites.other["official-artwork"]["front_default"]?
                                            <Image
                                                style={{height:70 , width:70}}
                                                source={{uri:item.sprites.other["official-artwork"]["front_default"]}}
                                            />
                                            :<NoImage name={formatPokemonName( item.name )} dimension={70}/>
                                        }
                                        {/* <Text>{}</Text> */}
                                    </View>
                                </TouchableOpacity>
                            )}}
                    />
                </SafeAreaView>
            :<Fallbacks text="This pokemon has no forms."/>
            }
        </View>
    )
}

export default Forms