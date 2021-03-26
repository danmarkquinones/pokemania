import React , {useContext , useEffect , useState} from "react";
import { Text, View ,TouchableOpacity, ScrollView, Image} from "react-native";
import { SearchesContext } from "../../context/searchesContext";
import axios from "axios";
import Loader from "../../shared_components/Loader";
import Fallbacks from "../../shared_components/Fallbacks";
import { MaterialIcons } from '@expo/vector-icons';
import {SearchCardLayout} from "../../shared_components/CardsLayout"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { formatWords } from "../../helpers/textFormat.helper";


const PokemonSearch = (props) => {

    const {navigation} = props
    const [results , setResults , recentSearches , setRecentSearches] = useContext(SearchesContext)
    const [suggestions,setSuggestions] = useState([])
    const [loading , setLoading] = useState(false)
    const [url,setUrl] = useState("")

    // console.log(recentSearches)

    useEffect(()=>{
        if(results.data){
            setLoading(true)
            const suggestionsArr = []
            results.data.varieties.forEach(el=>{
                if(!el.is_default){
                    axios.get(el.pokemon.url)
                    .then(res => {
                        // console.log(res.data)
                        suggestionsArr.push(res.data)
                        if(suggestionsArr.length===results.data.varieties.length-1){
                            setSuggestions(suggestionsArr)
                            setLoading(false)
                        }
                    }).catch(e => {
                        console.log(e)
                    })
                }else{
                    axios.get(el.pokemon.url)
                    .then(res => {
                        setUrl(res.data.sprites.other["official-artwork"].front_default)
                    }).catch(e => {
                        console.log(e)
                    })
                    setSuggestions([])
                    setLoading(false)
                }
            })
        }
    },[results.data])

    const handlePopulatesSearchBar = (value) =>{
        setResults({...results , text:value})
    }

    const removeRelatedSearch = (value) => {
        const filteredResearch = recentSearches.filter(el=>el!==value)
        setRecentSearches(filteredResearch)
        AsyncStorage.setItem("recentSearches" , JSON.stringify(filteredResearch))
    }

    return(
        <View
            style={{
                paddingHorizontal:5,
                flex:1,
                // marginVertical:5
            }}
        >
            <ScrollView showsVerticalScrollIndicator={false}>
                <View
                    style={{
                        backgroundColor:"#fff",
                        padding:10,
                        marginVertical:5,
                        borderRadius:10
                    }}
                >
                    <Text
                        style={{
                            fontWeight:"bold",
                            fontSize:15
                        }}
                    >Search Results
                    </Text>
                    <View>
                        {results.loading?
                            <Loader length={1}/>
                        :results.status==="success" && results.data?
                            <TouchableOpacity onPress={()=>navigation.navigate('PokemonSingle' , results.data)}>
                                <SearchCardLayout type="result" data={results.data} url={url}/>
                            </TouchableOpacity>
                        :results.status==="error"?<Fallbacks text="No pokemon matches your query."/>
                        :null
                        }
                    </View>
                    <Text
                        style={{
                            fontWeight:"bold",
                            fontSize:12,
                            marginTop:10
                        }}
                    >See Also :
                    </Text>
                    <View>
                        {loading?
                            <Loader length={1}/>
                        :suggestions.length?
                            suggestions.map((suggestion,index)=>
                                <TouchableOpacity key={index} onPress={()=>navigation.navigate('PokemonSingle' , suggestion)}>
                                    <View style={{marginVertical:5}}>
                                        <SearchCardLayout type="suggestion" data={suggestion} url={suggestion.sprites.other["official-artwork"].front_default}/>
                                    </View>
                                </TouchableOpacity>
                            )
                        :!suggestions.length || results.status==="error"? <Fallbacks text="No more pokemon related to your query."/>
                        :null
                        }
                    </View>
                </View>

                <View
                    style={{
                        backgroundColor:"#fff",
                        padding:10,
                        marginVertical:5,
                        borderRadius:10
                    }}
                >
                <Text
                    style={{
                        fontWeight:"bold",
                        fontSize:15,
                        marginBottom:10
                    }}
                >Recent Searches : 
                </Text>
                <View>
                {recentSearches.map((search , i)=>
                    <TouchableOpacity 
                        onPress={()=>handlePopulatesSearchBar(search)}
                    >
                        <View
                            key={i}
                            style={{
                                backgroundColor:"#f2f2f2",
                                borderRadius:10,
                                flexDirection:"row",
                                alignItems:"center",
                                paddingHorizontal:20,
                                paddingVertical:10,
                                marginVertical:5
                            }}
                        >   
                        
                                <Text
                                    style={{
                                        flex:1,
                                        fontSize:15,
                                        textTransform:"capitalize"
                                    }}
                                >
                                    {formatWords(search)}
                                </Text>
                            <TouchableOpacity onPress={()=>{removeRelatedSearch(search)}}>
                                <View>
                                    <MaterialIcons name="highlight-remove" size={30} color="#F93318"/>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                )}
                </View>
            </View>
            </ScrollView>
        </View>
    )
}

export default PokemonSearch