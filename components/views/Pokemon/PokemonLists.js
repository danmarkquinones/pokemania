import React , {useState , useEffect , useContext} from "react"
import { View , Text, FlatList , Button , Image , TouchableOpacity} from "react-native"
import axios from "axios"
import {pokemonStyles} from "./pokemonStyles"
import {generateTypeIcon} from "../../helpers/types.helper"
import {generatePokemonImage} from "../../helpers/pokemonImages.helper"
import { globalStyles } from "../../../assets/styles/globalStyle"
import { MaterialIcons } from '@expo/vector-icons';
import { PokemonContext } from "../../context/pokemonContext"
import { AsyncStoreContext } from "../../context/asyncStorageContext"
import Loader from "../../shared_components/Loader"
import Fallbacks from "../../shared_components/Fallbacks"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { checkInFavorites } from "../../helpers/favorites.helper"

const PokemonLists = (props) => {
    const {navigation} = props
    const [pokemons , setPokemons , filters , setFilters] = useContext(PokemonContext)
    const [favorites , setFavorites] = useContext(AsyncStoreContext)
    const [loading , setLoading] = useState(false)

    useEffect(()=>{
        const abortController = new AbortController()
        fetchPokemons(filters.limit,filters.offset)
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

    // useEffect(()=>{
    //     if(filters.default){
    //         fetchPokemons(filters.offset,filters.limit)
    //     }
    // },[filters])

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

    const clearFilter = () => {
        setLoading(true)
        axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${0}&limit=${10}`)
        .then(res => {
            let pokemonsRes = res.data.results
            let pokemonArr = []
            pokemonsRes.forEach((pokemon)=>{
                axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
                .then(res=>{
                    pokemonArr.push(res.data)
                    if(pokemonArr.length===10){
                        setPokemons(pokemonArr)
                        setFilters({...filters,default:false,start:"",end:"",selectedTypes:[]})
                        setLoading(false)
                    }
                }).catch(e=>console.log(e))
            })
        }).catch(e => console.log('FETCH FAILED',e))
    }


    const loadMorePokemons = () => {
        let newOffset = filters.offset + 10
        setFilters({...filters,offset:newOffset})
        fetchPokemons(filters.limit,newOffset)  
    }

    const addToFavorite = (pokemon) => {
        setFavorites([...favorites , pokemon])
        var favCopy = favorites
        favCopy.push(pokemon)
        AsyncStorage.setItem("favoritesPokemons" , JSON.stringify(favCopy))
    }

    const removeFromFavorite = (pokemon) => {
        const filtered = favorites.filter(fav=>fav.id!==pokemon.id)
        setFavorites(filtered)
        AsyncStorage.setItem("favoritesPokemons" , JSON.stringify(filtered))
    }

    // console.log("FAVORITES", favorites)

    return(
        <View style={pokemonStyles.container}>
            {pokemons.length?
                <FlatList
                    data={pokemons}
                    keyExtractor={(item,i)=>item.id.toString()}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item})=>{
                        return(
                            <View style={pokemonStyles.card}>
                                <View style={pokemonStyles.cardHeader}>
                                    <Text style={pokemonStyles.pokemonName}>{item.name.toUpperCase()}</Text>
                                    <Text style={pokemonStyles.pokemonId}>#N {item.id}</Text>
                                </View>
                                <View style={pokemonStyles.pokemonImage}>
                                    <Image className="img" style={{width: 100, height: 100}} 
                                        source={{uri : generatePokemonImage(item)}}
                                        resizeMode={'cover'}
                                    />
                                    <View style={{position:"absolute" , top:0 , right:0}}>
                                        <TouchableOpacity 
                                            onPress={()=>checkInFavorites(item , favorites)? addToFavorite(item) : removeFromFavorite(item)}
                                        >
                                            <View style={{padding:5}}>
                                                <MaterialIcons name={checkInFavorites(item , favorites)?"favorite-border":"favorite"} color="#F93318" size={30}/>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
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
                                {loading?
                                <View
                                    style={{flexDirection:"row"}}
                                >
                                    {/* <Loader length={1}/> */}
                                    <Fallbacks text="Fetching Pokemons..."/>
                                </View>
                                :pokemons.length === 898?null
                                :filters.default?
                                <TouchableOpacity onPress={clearFilter}>
                                    <View 
                                        style={{
                                            backgroundColor:"coral",
                                            padding:5,
                                            borderRadius:50
                                        }}
                                    >
                                        <Text style={{textAlign:"center",color:"#fff"}}>CLEAR FILTER</Text>
                                    </View>
                                </TouchableOpacity>
                                :<TouchableOpacity onPress={loadMorePokemons}>
                                    <View 
                                        style={{
                                            backgroundColor:"coral",
                                            padding:5,
                                            borderRadius:50
                                        }}
                                    >
                                        <Text style={{textAlign:"center",color:"#fff"}}>LOAD MORE</Text>
                                    </View>
                                </TouchableOpacity>
                                }
                            </View>
                        )
                    }}
                />
            :<View
                style={{
                    flex:1,
                    alignItems:"center"
                }}
            >
                <Loader length={3}/>
            </View>
            }
        </View>
    )
}

export default PokemonLists