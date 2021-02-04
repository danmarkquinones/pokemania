import React from "react"
import { Text, View , StyleSheet} from "react-native"
import { formatWords } from '../../../helpers/textFormat.helper';
import { Ionicons } from '@expo/vector-icons';
import {generateTypeColor} from '../../../helpers/types.helper'

const Breeding = (props)=>{

    const {pokemon , pokemonSpecie} = props

    const generateEggGroups = (groups) => {
        let eggGroup = groups.map(el => el.name)
        eggGroup = eggGroup.join(" , ")
        return eggGroup
    }

    const generateGenderRate = (gender , rate) => {
        if(gender === "male") {
            let calcrate = ((8-rate)/8)*100
            return calcrate + " %"
        }else{
            let calcrate = (rate/8)*100
            return calcrate + " %"
        }
    }

    const styles = StyleSheet.create({
        breedCardContainer : {
            flex:1,
            margin:3,
            borderRadius:5,
            overflow:"hidden",
            backgroundColor:generateTypeColor(pokemon.types[0].type.name),
            paddingHorizontal:3,
            paddingBottom:3
        },
        breedCardHeader:{
            backgroundColor:generateTypeColor(pokemon.types[0].type.name),
            paddingVertical:2
        },
        breedCardHeaderText:{
            color:"#fff",
            fontWeight:"bold",
            textAlign:"center",
            fontSize:15
        },
        breedCardContent:{
            paddingVertical : 10,
            justifyContent:"center",
            backgroundColor:"#fff",
            borderRadius:5
        },
        breedCardContentText:{
            textAlign:"center",
            textTransform:"capitalize",
            fontSize:15
        }
    })

    return(
        <View style={{paddingHorizontal:20, paddingVertical:10}}>
            <View style={{flexDirection:"column"}}>
                <View>
                    <View style={{flexDirection:"row"}}>
                        <View style={styles.breedCardContainer}>
                            <View style={styles.breedCardHeader}><Text style={styles.breedCardHeaderText}>Gender</Text></View>
                            
                            {pokemonSpecie.gender_rate > 0 ? 
                                <View style={styles.breedCardContent}>
                                    <View style={{flexDirection:"row" , justifyContent:"center"}}>
                                        <View style={{flexDirection:"row" , alignItems:"center" , marginHorizontal:5}}>
                                            <Ionicons name="male" color="blue" size={20}/>
                                            <Text style={{color:"blue"}}>{generateGenderRate("male",pokemonSpecie.gender_rate)}</Text>
                                        </View>
                                        <View style={{flexDirection:"row" , alignItems:"center" , marginHorizontal:5}}>
                                            <Ionicons name="female" color="pink" size={20}/>
                                            <Text style={{color:"pink"}}>{generateGenderRate("female",pokemonSpecie.gender_rate)}</Text>
                                        </View>
                                    </View>
                                </View>
                            :<View style={styles.breedCardContent}>
                                <Text style={styles.breedCardContentText}>Genderless</Text>
                            </View>
                            }
                        </View>

                        <View style={styles.breedCardContainer}>
                            <View style={styles.breedCardHeader}>
                                <Text style={styles.breedCardHeaderText} >Habitat</Text>
                            </View>
                            <View style={styles.breedCardContent}>
                                {pokemonSpecie.habitat ?
                                <Text style={styles.breedCardContentText}>
                                     {formatWords(pokemonSpecie.habitat.name)}
                                </Text>
                                :<Text style={styles.breedCardContentText}>Unknown</Text>}
                            </View>
                        </View>
                    </View>

                    <View style={{flexDirection:"row"}}>
                        <View style={styles.breedCardContainer}>
                            <View style={styles.breedCardHeader}>
                                <Text style={styles.breedCardHeaderText}>Egg Groups</Text>
                            </View>
                            <View style={styles.breedCardContent}>
                                <Text style={styles.breedCardContentText}>{generateEggGroups(pokemonSpecie.egg_groups)}</Text>
                            </View>
                        </View>
                        <View style={styles.breedCardContainer}>
                            <View style={styles.breedCardHeader}>
                                <Text style={styles.breedCardHeaderText}>Egg Cycle</Text>
                            </View>
                            <View style={styles.breedCardContent}>
                                <Text style={styles.breedCardContentText}>{pokemonSpecie.hatch_counter}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{flexDirection:"row"}}>
                        <View style={styles.breedCardContainer}>
                            <View style={styles.breedCardHeader}>
                                <Text style={styles.breedCardHeaderText}>Base EXP</Text>
                            </View>
                            <View style={styles.breedCardContent}>
                                <Text style={styles.breedCardContentText}>{pokemon.base_experience}</Text>
                            </View>
                        </View>
                        <View style={styles.breedCardContainer}>
                            <View style={styles.breedCardHeader}>
                                <Text style={styles.breedCardHeaderText}>Base Happiness</Text>
                            </View>
                            <View style={styles.breedCardContent}>
                                <Text style={styles.breedCardContentText}>{pokemonSpecie.base_happiness}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{flexDirection:"row"}}>
                        <View style={styles.breedCardContainer}>
                            <View style={styles.breedCardHeader}>
                                <Text style={styles.breedCardHeaderText}>Capture Rate</Text>
                            </View>
                            <View style={styles.breedCardContent}>
                                <Text style={styles.breedCardContentText}>{pokemonSpecie.capture_rate}</Text>
                            </View>
                        </View>
                        <View style={styles.breedCardContainer}>
                            <View style={styles.breedCardHeader}>
                                <Text style={styles.breedCardHeaderText}>Growth Rate</Text>
                            </View>
                            <View style={styles.breedCardContent}>
                                <Text style={styles.breedCardContentText}>{formatWords(pokemonSpecie.growth_rate.name)}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}



export default Breeding