import React,{useContext,useState,useEffect} from "react";
import { FlatList, Text, View , TextInput, TouchableOpacity} from "react-native";
import { Divider } from "react-native-paper";
import { PokemonContext } from "../../context/pokemonContext";
import * as _ from "lodash";
import { pokemonStyles } from "./pokemonStyles";
import axios from "axios";
import CheckBox from "react-native-check-box";

const PokemonFilter = (props) => {

    const {navigation} = props
    const [pokemons , setPokemons , filters , setFilters] = useContext(PokemonContext)
    const [typeHolder , setTypeHolder] = useState([])
    const [loading , setLoading] = useState(false)
    const [message , setMessage] = useState({status:"",text:""})

    console.log(filters.start,filters.end,filters.selectedTypes)
    
    useEffect(()=>{
        setTypeHolder(filters.types)
    },[])

    useEffect(()=>{
        if(typeHolder){
            var selectedArray = typeHolder.filter(el=>el.isSelected===true).map(el=>el.value)
            setFilters({...filters,selectedTypes:selectedArray})
        }
    },[typeHolder])

    const handleChange = (name , value) => {
        setFilters({...filters,[name]:value})
    }

    const handleSelectType = (value) =>  {

        let typesCopy = JSON.parse(JSON.stringify(typeHolder));

        typesCopy.forEach((el) => {
        if (el.value === value) {
            el.isSelected = !el.isSelected;
        }
        });
        setTypeHolder([...typesCopy]);
    }

    const onSubmit = () => {
        setLoading(true)
        setMessage({...message, status:"pending" , text : "Searching for results...Please wait..."})
        var offset = filters.start - 1
        var limit = (filters.end - filters.start) + 1
        setFilters({...filters,default:true})
        axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
        .then(res => {
            let pokemonsRes = res.data.results
            let pokemonArr = []
            pokemonsRes.forEach((pokemon)=>{
                axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
                .then(res=>{
                    pokemonArr.push(res.data)
                    if(pokemonArr.length===limit){
                        pokemonArr.forEach(el=>{
                            var typesArr = []
                            el.types.forEach(el=>{
                                typesArr.push(el.type.name)
                            })
                            el.pokemonTypes = typesArr
                        })

                        var filteredPokemon
                        if(filters.selectedTypes.length){
                            filteredPokemon = pokemonArr.filter(pokemon=> filters.selectedTypes.some(r=> pokemon.pokemonTypes.includes(r)) === true )
                        }else{
                            filteredPokemon = pokemonArr
                        }
                        setPokemons(filteredPokemon)
                        setLoading(false)
                        setMessage({
                            ...message, 
                            status:"success" , 
                            text : filteredPokemon.length?`Found ${filteredPokemon.length} on your query`:'No pokemon found on your query, kindly change your filter'
                        })
                    }
                }).catch(e=>{
                    setMessage({...message, status:"error" , text : `Request failed.. Please try again later..`})
                })
            })
        }).catch(e => console.log('FETCH FAILED',e))
    }

    return(
        <View
            style={{
                padding:10,
                backgroundColor:"#fff",
                flex:1
            }}
        >
            <View>
                <View>
                    <Text style={{fontWeight:"bold"}}>Number Range</Text>
                </View>
                <View
                    style={{
                        display:"flex",
                        flexDirection:"row",
                        // flex:1,
                        alignItems:"center",
                        marginVertical:10
                    }}
                >
                    <View style={pokemonStyles.filterTextFieldDiv}>
                        <View style={{paddingHorizontal:10}}>
                            <Text style={{color:"#fff"}}>Start</Text>
                        </View>
                        <TextInput 
                            keyboardType='numeric'
                            style={pokemonStyles.filterTextField}
                            value={+filters.start}
                            onChangeText={text=>handleChange("start",+text)}
                        />
                    </View>
                    <View
                        style={{
                            width:30,
                            display:"flex",
                            justifyContent:"center",
                            alignItems:"center"
                        }}
                    >
                        <Text style={{fontSize:20}}> - </Text>
                    </View>
                    <View style={pokemonStyles.filterTextFieldDiv}>
                        <View style={{paddingHorizontal:10}}>
                            <Text style={{color:"#fff"}}>End</Text>
                        </View>
                        <TextInput
                            keyboardType='numeric'
                            style={pokemonStyles.filterTextField}
                            value={+filters.end}
                            onChangeText={text=>handleChange("end",+text)}
                        />
                    </View>
                </View>
            </View>

            <Divider style={{marginVertical:5}}/>

            <View>
                <View>
                    <Text style={{fontWeight:"bold"}}>Select Type</Text>
                </View>
                <View>
                    {typeHolder.length?
                    <FlatList
                        data={typeHolder}
                        keyExtractor={(item,i)=>item.id}
                        numColumns={3} 
                        showsVerticalScrollIndicator={false}
                        renderItem={({item})=>{
                            return(
                                // <TouchableOpacity onPress={()=>handleSelectType(item.value)}>
                                    <View
                                        // style={{flex:1 , paddingHorizontal:20 , paddingVertical:10}}
                                        style={[pokemonStyles.typeListView,{backgroundColor:item.bgColor}]}
                                    >
                                        <CheckBox
                                            style={{ flex: 1 }}
                                            isChecked={item.isSelected}
                                            onClick={() => handleSelectType(item.value)}
                                            color={item.bgColor}
                                            leftText={item.value}
                                            checkedCheckBoxColor={"#fff"}
                                            uncheckedCheckBoxColor={"#fff"}
                                            leftTextStyle={{
                                                textTransform:"capitalize",
                                                color: "#fff",
                                                fontWeight: "bold",
                                            }}
                                        />
                                    </View>
                                // </TouchableOpacity>
                            )
                        }}
                    />
                    :null}
                </View>
            </View>

            <Divider style={{marginVertical:5}}/>
                        
            <View style={{display:"flex" , flexDirection:"row", alignItems:"center" , flex:1}}>
                <Text style={{color : message.status==="success"? "lime" :message.status==="pending"?"gray": "tomato"}}>{message.text}</Text>
                {message.status === "success" && pokemons.length?
                    <TouchableOpacity onPress={()=>navigation.navigate("PokemonLists")}>
                        <View style={{marginHorizontal:10}}>
                            <Text>See Results</Text>
                        </View>
                    </TouchableOpacity>
                :null}
            </View>

            <Divider style={{marginVertical:5}}/>

            <View style={{display:"flex" , alignItems:"flex-end" , justifyContent:"flex-end", flex:1}}>
                {loading?
                    <View style={pokemonStyles.filterSubmitButtonView}>
                        <Text style={{color:"#fff"}}>LOADING...</Text>
                    </View>
                    :<TouchableOpacity onPress={onSubmit}>
                        <View style={pokemonStyles.filterSubmitButtonView}>
                            <Text style={{color:"#fff"}}>SUBMIT</Text>
                        </View>
                    </TouchableOpacity>
                }
            </View>
            
        </View>
    )
}

export default PokemonFilter