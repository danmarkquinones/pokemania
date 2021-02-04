import React , {useState , useEffect , useContext} from "react"
import { View , Text, FlatList , Button , Image , ScrollView, TouchableOpacity, TextInput, SafeAreaView} from "react-native"
import axios from "axios"
import {pokemonStyles} from "./pokemonStyles"
import {generateTypeIcon} from "../../helpers/types.helper"
import {generatePokemonImage} from "../../helpers/pokemonImages.helper"
import { globalStyles } from "../../../assets/styles/globalStyle"
import { MaterialIcons } from '@expo/vector-icons';
import { PokemonContext } from "../../context/pokemonContext"

const PokemonLists = (props) => {
    const {navigation} = props
    const [pokemons , setPokemons] = useContext(PokemonContext)
    const [fetchUrlParams,setFetchUrlParams] = useState({offset:20,limit:10})
    const [loading , setLoading] = useState(false)

    useEffect(()=>{
        const abortController = new AbortController()
        fetchPokemons(fetchUrlParams.limit,fetchUrlParams.offset)
        return ()=>{
            abortController.abort()
        }
    },[])

    useEffect(()=>{
        if(pokemons){
            let sortedByOrder = pokemons.sort(function(a, b){return a["id"]-b["id"]})
            setPokemons(sortedByOrder)
        }
    },[pokemons])

    const fetchPokemons = (limit,offset) => {
        setLoading(true)
        axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
        .then(res => {
            let pokemonsRes = res.data.results
            let pokemonArr = []
            pokemonsRes.forEach((pokemon)=>{
                axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
                .then(res=>{
                    pokemonArr.push(res.data)
                    if(pokemonArr.length===limit){
                        setPokemons(pokemons.concat(pokemonArr))
                        setLoading(false)
                    }
                }).catch(e=>console.log(e))
            })
        }).catch(e => console.log('FETCH FAILED',e))
    }

    const loadMorePokemons = () => {
        let newOffset = fetchUrlParams.offset + 10
        setFetchUrlParams({...fetchUrlParams,offset:newOffset})
        fetchPokemons(fetchUrlParams.limit,newOffset)  
    }


    return(
        <View style={pokemonStyles.container}>
            <FlatList
                data={pokemons}
                keyExtractor={(item,i)=>item.id.toString()}
                numColumns={2}
                renderItem={({item})=>{
                    return(
                        <View style={pokemonStyles.card}>
                            <View style={pokemonStyles.cardHeader}>
                                <Text style={pokemonStyles.pokemonName}>{item.name.toUpperCase()}</Text>
                                <Text style={pokemonStyles.pokemonId}>#{item.id}</Text>
                            </View>
                            <View style={pokemonStyles.pokemonImage}>
                                <Image className="img" style={{width: 100, height: 100}} 
                                    source={{uri : generatePokemonImage(item)}}
                                    resizeMode={'cover'}/>
                            </View>
                            <View style={pokemonStyles.cardFooter}>
                                {item.types.map((type,i)=>
                                    <View key={i} style={pokemonStyles.pokemonTypes}>
                                        <Image 
                                            style={{width:20,height:20}} 
                                            source={{uri:generateTypeIcon(type.type.name)
                                        }}/>
                                        
                                    </View>
                                )}
                                <View style={pokemonStyles.pokemonView}>
                                    <TouchableOpacity onPress={()=>navigation.navigate('PokemonSingle' , item)}>
                                        <View style={globalStyles.customPrimaryBtn}>
                                            <Text style={globalStyles.customPrimaryText}>VIEW</Text>
                                            <MaterialIcons name="keyboard-arrow-right" color="#fff" size={20}/>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )
                }}
                ListFooterComponent={()=>{
                    return(
                        <View style={{padding:20}}>
                            {loading?<Text>FETCHING...</Text>
                            :<Button 
                                title={"LOAD MORE"} 
                                onPress={loadMorePokemons} 
                                color='#50d0ff'
                            />}
                        </View>
                    )
                }}
            />
        </View>
    )
}

export default PokemonLists