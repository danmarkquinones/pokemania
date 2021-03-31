import React , {useContext} from "react"
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native"
import { MaterialIcons } from '@expo/vector-icons';
import {navigationStyles} from '../routes/navigationStyles'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SearchesContext } from "../context/searchesContext";
import axios from "axios"

const CustomHeader = (props) => {
    const {title , navigation} = props
    const [results , setResults , recentSearches , setRecentSearches] = useContext(SearchesContext)

    const push = (searchArr) => {
        // console.log("VALUE", results.text , searchArr)
        setResults({...results, loading:true})
        setRecentSearches([results.text , ...recentSearches])
        // searchArr.unshift(results.text)
        searchArr=[results.text,...searchArr]
        AsyncStorage.setItem("recentSearches" , JSON.stringify(searchArr))
        axios.get(`https://pokeapi.co/api/v2/pokemon-species/${results.text.toLowerCase()}`)
        .then(res => {
            setResults({...results,
                text:"",
                loading:false,
                data: res.data,
                status:"success"
            })
        }).catch(e => {
            setResults({...results, text:"", data: "", loading:false , status:"error"})
        })
    }

    const handleChange = (value) =>{
        console.log(value)
        setResults({...results , text:value})
    }

    const onSubmit = (e) => {
        
        var searchArr = recentSearches
        

        if(e.key==="Enter"){
            if(recentSearches.length > 5){
                searchArr.pop()
                setRecentSearches([...searchArr])
                AsyncStorage.setItem("recentSearches" , JSON.stringify(searchArr))
                // console.log("searchArr>5" , searchArr)
                push(searchArr)
            }else{
                // console.log("searchArr<5" , searchArr)
                push(searchArr)
            }
        }
    }

    const onClick = () => {
        var searchArr = recentSearches
        if(recentSearches.length > 5){
            searchArr.pop()
            setRecentSearches(searchArr)
            push(searchArr)
        }else{
            push(searchArr)
        }
    }


    return (
        <View style={navigationStyles.header}>
            {title==="Pokedex"?
                <View
                    style={[navigationStyles.containerRow , {justifyContent:"flex-start"}]}
                >
                    <Image source={require("../../assets/images/pokeball.png")} style={{height:30 , width:30}}/>
                    <Image source={require("../../assets/images/pokemaniawhite.png")} style={{height:30 , width:180}}/> 
                </View>
            :title==="Search Pokemon"?
                <View
                    style={{
                        width:"100%",
                        alignItems:"center",
                        justifyContent:"flex-end",
                        flexDirection:"row",
                        backgroundColor:"#fff",
                        borderRadius:5,
                        overflow:"hidden",
                        borderWidth:1,
                        borderColor:"#fff"
                    }}
                >
                    <TouchableOpacity onPress={onClick}>
                        <View
                            style={{
                                paddingHorizontal:5,
                                borderRightWidth:1,
                                borderRightColor:"gray"
                            }}
                        >
                            <MaterialIcons name="search" size={20}/>
                        </View>
                    </TouchableOpacity>
                    <TextInput
                        style={{
                            flex:1,
                            backgroundColor:"#fff",
                            padding:5
                        }}
                        value={results.text}
                        placeholder="Search Pokemon Name"
                        onChangeText={text=>handleChange(text)}
                        onKeyPress={onSubmit}
                    />
                </View>
            :<View>
                <Text style={navigationStyles.title}>{title}</Text>
            </View>
            }
            <View
                style={[navigationStyles.containerRow , {justifyContent:"flex-end"}]}
            >
                {title==="Pokedex"?<View style={{marginRight:3}}>
                    <TouchableOpacity style={navigationStyles.headerIcon} onPress={()=>navigation.navigate("PokemonFilter")}>
                        <MaterialIcons  name='filter-list' size={18} color='#F93318' style={navigationStyles.searchIcon} />
                    </TouchableOpacity>
                </View>:null}
                {title!=="Search Pokemon"?
                    <View>
                        <TouchableOpacity style={navigationStyles.headerIcon} onPress={()=>navigation.navigate("PokemonSearch")}>
                            <MaterialIcons  name='search' size={18} color='#F93318' style={navigationStyles.searchIcon} />
                        </TouchableOpacity>
                    </View>
                :null}
            </View>
        </View>
    )
}

export default CustomHeader