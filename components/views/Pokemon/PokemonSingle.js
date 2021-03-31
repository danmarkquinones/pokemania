import React , {useEffect , useState ,useContext} from "react"
import axios from "axios"
import { View , Text ,TouchableWithoutFeedback , Image ,ScrollView, TouchableOpacity, StyleSheet } from "react-native"
import {pokemonStyles} from "./pokemonStyles"
import { MaterialIcons } from '@expo/vector-icons';
import {generateTypeIcon , generateTypeColor} from "../../helpers/types.helper"
import AbilitiesMoves from "./PokemonSingleViewChildren/AbilitiesMoves"
import BaseStats from "./PokemonSingleViewChildren/BaseStats";
import Breeding from "./PokemonSingleViewChildren/Breeding";
import EvolutionTree from "./PokemonSingleViewChildren/EvolutionTree";
import Encounter from "./PokemonSingleViewChildren/Encounter";
import { generatePokemonImage } from "../../helpers/pokemonImages.helper";
import Forms from "./PokemonSingleViewChildren/Forms";
import { SafeAreaView } from "react-navigation";
import Loader from "../../shared_components/Loader";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AsyncStoreContext } from "../../context/asyncStorageContext"
import { checkInFavorites } from "../../helpers/favorites.helper"

const PokemonSingle = (props) => {
    const {navigation , route} = props
    const data = route.params

    const [pokemon , setPokemon] = useState()
    const [pokemonSpecie , setPokemonSpecie] = useState()
    const [favorites , setFavorites] = useContext(AsyncStoreContext)

    useEffect(() => {
        if(data){
            fetchPokemon(data.id)
        }
    }, [data])

    const fetchPokemon = (id) => {
        console.log(id)
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(res => {
            setPokemon(res.data)
            fetchSpecie(res.data.species.url)
        }).catch(e => console.log('FETCH FAILED',e))
    }

    const fetchSpecie = (url) =>{
        axios.get(url)
        .then(res => {
            setPokemonSpecie(res.data)
        })
    }

    const getPokemonSpecie = (genera) => {
        let pokemonGenus = ""
        genera.forEach(genus=>{
            if(genus.language.name==="en"){
                pokemonGenus = genus.genus
            }
        })

        return pokemonGenus
    }

    const handleNextPokemon = (type , id) => {
        if(type==="next"){
            fetchPokemon(id+1)
        }else{
            fetchPokemon(id-1)
        }
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

    const styles = StyleSheet.create({
        breedCardContainer : {
            // flex:1,
            // width:"100%",
            margin:3,
            borderRadius:5,
            overflow:"hidden",
            backgroundColor:pokemon && generateTypeColor(pokemon.types[0].type.name),
            paddingHorizontal:3,
            paddingBottom:3
        },
        breedCardHeader:{
            backgroundColor:pokemon && generateTypeColor(pokemon.types[0].type.name),
            paddingVertical:2
        },
    })

    return (
        <TouchableWithoutFeedback>
            {pokemon && pokemonSpecie ? 
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={pokemonStyles.singleViewPokemonContainer}>
                    <View style={pokemonStyles.singleViewPokemonHeadCont}>

                        <View style={pokemonStyles.singleViewPokemonPrevCont}>
                            <TouchableOpacity onPress={()=>handleNextPokemon("prev",pokemon.id)} disabled={pokemon.id===1?true:false}>
                                <View 
                                style={[pokemonStyles.singleViewPokemonPrev , 
                                        {transform:[
                                                { rotateY: "180deg"}
                                            ],
                                            backgroundColor:pokemon.id===1?"gray":"tomato", 
                                        }
                                        ]}>
                                    <MaterialIcons style={{textAlign:"center"}} name="double-arrow" color="#fff" size={20}/>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={pokemonStyles.singleViewPokemonName}>
                            <Text style={{fontWeight:"bold" , fontSize:16 ,color:"#fff" , textTransform:"uppercase"}}>{pokemon.name}</Text>
                            {pokemon.id < 1000 ?
                                <Text style={{backgroundColor:"#fff" , paddingHorizontal:10 , marginHorizontal:10 , borderRadius:5}}>#N {pokemon.id}</Text>
                            :null
                            }
                        </View>

                        <View style={pokemonStyles.singleViewPokemonNextCont}>
                            <TouchableOpacity onPress={()=>handleNextPokemon("next",pokemon.id)}>
                                <View style={pokemonStyles.singleViewPokemonNext}>
                                    <MaterialIcons style={{textAlign:"center"}} name="double-arrow" color="#fff" size={20}/>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                    <View style={{backgroundColor:"#fff"}}>

                        <View style={pokemonStyles.singleViewPokemonHeader}>
                            {pokemonSpecie ? 
                            <View style={pokemonStyles.singleViewPokemonDetails}>

                                <View style={{position:"absolute" , top:0 , right:-200 , zIndex:10}}>
                                    <TouchableOpacity 
                                        onPress={()=>checkInFavorites(pokemon , favorites)? addToFavorite(pokemon) : removeFromFavorite(pokemon)}
                                    >
                                        <View style={{padding:5}}>
                                            <MaterialIcons name={checkInFavorites(pokemon , favorites)?"favorite-border":"favorite"} color="#F93318" size={30}/>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.breedCardContainer}>
                                    <View style={styles.breedCardHeader}>
                                        <Text style={pokemonStyles.breedCardHeaderText}>Species</Text>
                                    </View>
                                    <View style={pokemonStyles.breedCardContent}>
                                        <Text style={pokemonStyles.breedCardContentText}>{getPokemonSpecie(pokemonSpecie.genera)}</Text>
                                    </View>
                                </View>

                                <View style={styles.breedCardContainer}>
                                    <View style={styles.breedCardHeader}>
                                        <Text style={pokemonStyles.breedCardHeaderText}>Types</Text>
                                    </View>
                                    <View style={pokemonStyles.breedCardContent}>
                                        <View style={{ paddingHorizontal :20}}>
                                            {pokemon.types.map((type,i)=>
                                                <View key={i} 
                                                    style={{
                                                            flexDirection:"row" , 
                                                            marginTop:5 , 
                                                            backgroundColor:generateTypeColor(type.type.name),
                                                            padding:5,
                                                            borderRadius:50
                                                        }}
                                                >
                                                    <Image 
                                                        style={{width:15,height:15}} 
                                                        source={{uri:generateTypeIcon(type.type.name)
                                                    }}/>
                                                    <Text style={{fontSize:10,color:"#fff",marginHorizontal:5 , textTransform:"uppercase"}}>{type.type.name}</Text>
                                                </View>
                                            )}
                                        </View>
                                    </View>
                                </View>
                            </View>
                            :<Text>LOADING</Text>}
                            
                            <View style={pokemonStyles.singleViewPokemonImageCont}>
                                <Image 
                                    style={pokemonStyles.singleViewPokemonImage}
                                    style={{width: 200, height: 200}} 
                                    source={{uri : generatePokemonImage(pokemon)}}
                                />
                            </View>
                        </View>
                        
                        <View style={{flexDirection:"row" , paddingHorizontal :10 , marginTop:10}}>
                            <View style={[styles.breedCardContainer, {flex:1}]}>
                                <View style={styles.breedCardHeader}>
                                    <Text style={pokemonStyles.breedCardHeaderText}>Height</Text>
                                </View>
                                <View style={pokemonStyles.breedCardContent}>
                                    <Text style={pokemonStyles.breedCardContentText}>{pokemon.height / 10} meter(s)</Text>
                                </View>
                            </View>

                            <View style={[styles.breedCardContainer, {flex:1}]}>
                                <View style={styles.breedCardHeader}>
                                    <Text style={pokemonStyles.breedCardHeaderText}>Weight</Text>
                                </View>
                                <View style={pokemonStyles.breedCardContent}>
                                    <Text style={pokemonStyles.breedCardContentText}>{pokemon.weight / 10} kilogram(s)</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={pokemonStyles.singleViewPokemonContent}>
                        <View style={pokemonStyles.singleViewPokemonContentTitle}>
                            <Text style={pokemonStyles.singleViewPokemonContentTitleText}>Ability & Moves</Text>
                            <View style={pokemonStyles.singleViewDivider}></View>
                        </View>
                        <SafeAreaView>
                        <AbilitiesMoves pokemon={pokemon} pokemonSpecie={pokemonSpecie}/>
                        </SafeAreaView>
                    </View>

                    <View style={pokemonStyles.singleViewPokemonContent}>
                        <View style={pokemonStyles.singleViewPokemonContentTitle}>
                            <Text style={pokemonStyles.singleViewPokemonContentTitleText}> Base Stats</Text>
                            <View style={pokemonStyles.singleViewDivider}></View>
                        </View>
                        <BaseStats pokemonStats={pokemon.stats}/>
                    </View>

                    <View style={pokemonStyles.singleViewPokemonContent}>
                        <View style={pokemonStyles.singleViewPokemonContentTitle}>
                            <Text style={pokemonStyles.singleViewPokemonContentTitleText}>Breeding & Training</Text>
                            <View style={pokemonStyles.singleViewDivider}></View>
                        </View>
                        <Breeding pokemonSpecie={pokemonSpecie} pokemon={pokemon}/>
                    </View>

                    <View style={pokemonStyles.singleViewPokemonContent}>
                        <View style={pokemonStyles.singleViewPokemonContentTitle}>
                            <Text style={pokemonStyles.singleViewPokemonContentTitleText}>Evolution Tree</Text>
                            <View style={pokemonStyles.singleViewDivider}></View>
                        </View>
                        <EvolutionTree pokemon={pokemon} evolveUrl={pokemonSpecie.evolution_chain} navigation={navigation}/>
                    </View>

                    <View style={pokemonStyles.singleViewPokemonContent}>
                        <View style={pokemonStyles.singleViewPokemonContentTitle}>
                            <Text style={pokemonStyles.singleViewPokemonContentTitleText}>Forms</Text>
                            <View style={pokemonStyles.singleViewDivider}></View>
                        </View>
                        <Forms pokemon={pokemon} forms={pokemonSpecie.varieties} navigation={navigation} />
                    </View>

                    <View style={pokemonStyles.singleViewPokemonContent}>
                        <View style={pokemonStyles.singleViewPokemonContentTitle}>
                            <Text style={pokemonStyles.singleViewPokemonContentTitleText}>Location</Text>
                            <View style={pokemonStyles.singleViewDivider}></View>
                        </View>
                        <Encounter pokemon={pokemon}/>                     
                    </View>
                </View>
            </ScrollView>
            :<View
                style={{
                    flex:1,
                    alignItems:"center"
                }}
            >
                <Loader length={3}/>
            </View>
            }
        </TouchableWithoutFeedback>
    )
}

export default PokemonSingle