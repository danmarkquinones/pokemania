import React , {useState , useEffect} from "react"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import axios from "axios"
import { MaterialIcons } from '@expo/vector-icons';
import { formatWords } from "../../../helpers/textFormat.helper";
import { generateTypeColor } from "../../../helpers/types.helper";

const EvolutionTree = (props) => {

    const {pokemon , evolveUrl ,navigation} = props
    const [evolveTree , setEvolveTree] = useState()
    const [firstEvolves,setFirstEvolves] = useState([])
    const [secondEvolves,setSecondEvolves] = useState([])
    const [thirdEvolves,setThirdEvolves] = useState([])

    useEffect(() => {
        console.log(evolveUrl)
        if(evolveUrl){
            axios.get(evolveUrl.url)
            .then(res => {
                setEvolveTree(res.data)
                if(res.data){

                    axios.get(`https://pokeapi.co/api/v2/pokemon/${res.data.chain.species.name}`)
                    .then(res=>{
                        setFirstEvolves([res.data])
                    })

                    let secondEvolveArr = []
                    res.data.chain.evolves_to.forEach(el=>{
                        axios.get(`https://pokeapi.co/api/v2/pokemon/${el.species.name}`)
                        .then(response=>{
                            secondEvolveArr.push(response.data)
                            if(secondEvolveArr.length === res.data.chain.evolves_to.length){
                                setSecondEvolves(secondEvolveArr)
                            }
                        })
                    })

                    let thirdEvolveArr = []
                    res.data.chain.evolves_to.forEach(el=>{
                        el.evolves_to.forEach(evolve=>{
                            axios.get(`https://pokeapi.co/api/v2/pokemon/${evolve.species.name}`)
                            .then(res=>{
                                thirdEvolveArr.push(res.data)
                                if(thirdEvolveArr.length === el.evolves_to.length){
                                    setThirdEvolves(thirdEvolveArr)
                                }
                            })
                        })
                    })
                }
                
            }).catch(e => console.log('FETCH FAILED',e))
        }
    }, [evolveUrl])
    

    const styles = StyleSheet.create({
        inactiveEvolve :{
            flexDirection:"column",
            alignItems:"center",
            borderWidth:0,
            padding : 5,
            width:70,
        },
        activeEvolve:{
            flexDirection:"column",
            alignItems:"center",
            borderWidth:2,
            padding : 5,
            width:70,
            borderRadius : 10,
            borderColor:generateTypeColor(pokemon.types[0].type.name)
        }
    })

    return(
        <View style={{marginLeft:-20 , paddingVertical:10}}>
            {evolveTree ? 
                <View style={{flexDirection:"row" , alignItems:"center"}}>

                    {secondEvolves.length?<View style={{flex:1 , alignItems:"center" }}>
                        {firstEvolves.map((el,i)=>
                            <View key={i} style={{flexDirection:"row" , width:50}}>
                                <TouchableOpacity  onPress={()=>navigation.navigate('PokemonSingle' , el)}>
                                    <View style={pokemon.name === el.species.name ? styles.activeEvolve : styles.inactiveEvolve}>
                                        <Image 
                                            style={{width:50,height:50}} 
                                            source={{uri: el.sprites.other["official-artwork"]["front_default"]}}
                                        />
                                        {/* <Text key={i} style={{textAlign:"center", textTransform:"capitalize"}}>{formatWords(el.species.name)}</Text> */}
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                    :<View>
                        <Text>This pokemon does not evolve</Text>
                    </View>
                    }
                    
                    {secondEvolves.length ? <View style={{flex:1 , justifyContent:"center"}}>
                        {secondEvolves.map((el,i)=>
                            <View key={i} style={{flexDirection:"row" , alignItems:"center"}}>
                                <MaterialIcons style={{marginRight:15}} name="double-arrow" color="gray" size={20}/>
                                <TouchableOpacity  onPress={()=>navigation.navigate('PokemonSingle' , el)}>
                                    <View style={pokemon.name === el.species.name ? styles.activeEvolve : styles.inactiveEvolve}>
                                        <Image 
                                            style={{width:50,height:50}} 
                                            source={{uri: el.sprites.other["official-artwork"]["front_default"]}}
                                        />
                                        {/* <Text key={i} style={{textAlign:"center" , textTransform:"capitalize"}}>{formatWords(el.species.name)}</Text> */}
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>:null}
                    
                    {thirdEvolves.length ? <View style={{flex:1 , justifyContent:"center"}}>
                        {thirdEvolves.map((el,i)=>
                            <View key={i} style={{flexDirection:"row" , alignItems:"center"}}>
                                <MaterialIcons style={{marginHorizontal:10}} name="double-arrow" color="gray" size={20}/>
                                <TouchableOpacity onPress={()=>navigation.navigate('PokemonSingle' , el)}>
                                    <View style={pokemon.name === el.species.name ? styles.activeEvolve : styles.inactiveEvolve}>
                                        <Image 
                                            style={{width:50,height:50}} 
                                            source={{uri: el.sprites.other["official-artwork"]["front_default"]}}
                                        />
                                        {/* <Text key={i} style={{textAlign:"center" , textTransform:"capitalize"}}>{formatWords(el.species.name)}</Text> */}
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>:null}
                </View>
            :<Text>Loading...</Text>
            }
        </View>
    )
}

export default EvolutionTree