import React from "react";
import { Text, View ,FlatList, SafeAreaView , TouchableOpacity, StyleSheet} from "react-native";
import { Chip } from 'react-native-paper';
import {formatWords} from "../../../helpers/textFormat.helper"
import { DataTable } from 'react-native-paper';
import { generateTypeColor } from "../../../helpers/types.helper";

const AbilitiesMoves = (props) => {
    const {pokemon , pokemonSpecie} = props

    const [page, setPage] = React.useState(0);
    const [pokemonPerPage , setPokemonPerPage] = React.useState([])

    const itemsPerPage = 3;
    const from = page * itemsPerPage;
    const to = (page + 1) * itemsPerPage;

    React.useEffect(()=>{
        if(pokemon && page===0){
            setPokemonPerPage(pokemon.moves.slice(0,3))
        }else{
            setPokemonPerPage(pokemon.moves.slice(from,to))
        }
        
    },[page , pokemon])

    const handlePageChange = (page) => {
        // console.log("fromto" ,from , to)
        setPage(page)
    }

    const generateMethod = (method) => {
        if(method==="egg"){
            return "By Breeding"
        }else if(method==="machine"){
            return "By TM"
        }else if(method==="level-up"){
            return "By Level Up"
        }else{
            return "By Tutor"
        }
    }

    const generateReq = (req) => {
        if(req===0){
            return "N/A"
        }else{
            return `Must be lvl ${req}`
        }
    }

    const styles = StyleSheet.create({
        abilityContainer:{
            position:"relative",
            alignItems:"center" , 
            borderWidth:2 , 
            borderColor:generateTypeColor(pokemon.types[0].type.name),
            borderRadius:10,
            paddingVertical : 5
        },
        abilityHeader:{
            position:"absolute",
            top:-12,
            borderWidth:2 , 
            borderColor:generateTypeColor(pokemon.types[0].type.name),
            borderRadius:10,
            paddingHorizontal : 10,
            backgroundColor:"#fff"
        },
        abilityHeaderText:{
            textAlign:"center" , 
            fontWeight:"bold",
            color:generateTypeColor(pokemon.types[0].type.name),
        }
    })

    return (
        <View style={{padding:10}}>
            <View style={{flexDirection:"column"}}>
                <View style={styles.abilityContainer}>
                    <View style={styles.abilityHeader}>
                        <Text style={styles.abilityHeaderText}>ABILITIES</Text>
                    </View>
                    <View style={{marginTop:12 , flex:1}}>
                            <FlatList
                                data={pokemon.abilities}
                                keyExtractor={(item,i)=>item.ability.name}
                                numColumns={3}
                                renderItem={({item})=>{
                                    return(
                                        <Chip style={{marginBottom:5 , marginHorizontal:5}} icon="information" onPress={() => console.log(item)}>
                                            <Text style={{textTransform:"capitalize" , fontSize:10 , marginRight:5}} ellipsizeMode='tail'>{formatWords(item.ability.name)}</Text>
                                        </Chip>
                                    )
                                }}
                            />
                    </View>
                </View>

                <View style={{marginTop:10}}>
                    <View style={{flexDirection:"column" , justifyContent:"flex-start" , alignItems:"flex-start"}}>
                        <DataTable>
                            <DataTable.Header>
                                <DataTable.Title
                                    // sortDirection='descending'
                                    style={{flex:2}}
                                >
                                    Move Name
                                </DataTable.Title>
                                <DataTable.Title>Method</DataTable.Title>
                                <DataTable.Title>Req</DataTable.Title>
                            </DataTable.Header>

                            {pokemonPerPage.length ? pokemonPerPage.map((el,i)=>
                                <DataTable.Row key={i}>
                                    <DataTable.Cell style={{flex:2}}>
                                        <Chip icon="information" onPress={() => console.log('Pressed')}>
                                            <Text style={{textTransform:"capitalize" , fontSize:10 , marginRight:5}}>{formatWords(el.move.name)}</Text>
                                        </Chip>
                                    </DataTable.Cell>
                                    <DataTable.Cell>
                                        <Text style={{fontSize:10}}>{generateMethod(el.version_group_details[0]["move_learn_method"]["name"])}</Text>
                                    </DataTable.Cell>
                                    <DataTable.Cell>
                                        <Text style={{fontSize:10}}>{generateReq(el.version_group_details[0]["level_learned_at"])}</Text>
                                    </DataTable.Cell>
                                </DataTable.Row>)
                                :<DataTable.Row>
                                    <DataTable.Cell>
                                        <Text>Moves not yet available</Text>
                                    </DataTable.Cell>
                                </DataTable.Row>
                            }
                            
                            <DataTable.Pagination
                                page={page}
                                numberOfPages={Math.floor(pokemon.moves.length / itemsPerPage)}
                                onPageChange={(page) => handlePageChange(page)}
                                label={`${from + 1}-${to} of ${pokemon.moves.length}`}
                            />

                        </DataTable>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default AbilitiesMoves