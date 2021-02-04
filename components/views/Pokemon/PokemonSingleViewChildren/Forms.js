import React , {useEffect , useState} from "react"
import { Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native"
import axios from "axios"
import { formatPokemonName } from "../../../helpers/textFormat.helper"
import { FlatList } from "react-native-gesture-handler"

const Forms = (props) => {
    const {forms , navigation} = props
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

    console.log("RES" , pokemonForms)
    return (
        <View>
            {loading ? 
                <View><Text>Loading...</Text></View>
            :pokemonForms.length?
                <SafeAreaView style={{alignItems:"center"}}>
                    <FlatList
                        data={pokemonForms}
                        keyExtractor={(item,i)=>item.id.toString()}
                        numColumns={2}
                        renderItem={({item})=>{
                            return(
                                <TouchableOpacity onPress={()=>navigation.navigate('PokemonSingle' , item)}>
                                    <View style={{borderWidth:1 , alignItems:"center" , padding:10 , marginHorizontal : 10}}>
                                        <Image
                                            style={{height:70 , width:70}}
                                            source={{uri:item.sprites.other["official-artwork"]["front_default"]}}
                                            // sourc={{uri:`https://bulbapedia.bulbagarden.net/wiki/File:009Blastoise-Gigantamax.png`}}
                                        />
                                        <Text>{formatPokemonName( item.name )}</Text>
                                    </View>
                                </TouchableOpacity>
                            )}}
                    />
                </SafeAreaView>
            :<Text>No Forms</Text>
            }
        </View>
    )
}

export default Forms