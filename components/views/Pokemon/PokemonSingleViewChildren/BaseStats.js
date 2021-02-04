import React from "react";
import { View , Text} from "react-native";
import { ProgressBar, Colors } from 'react-native-paper';
import {formatWords} from "../../../helpers/textFormat.helper"


const BaseStats = (props) => {

    const {pokemonStats} = props

    const generateColor = (name) => {
        if(name==="hp"){
            return "green"
        }else if(name==="attack"){
            return "red"
        }else if(name==="defense"){
            return "blue"
        }else if(name==="speed"){
            return "yellow"
        }else if(name==="special-attack"){
            return "orange"
        }else{
            return "violet"
        }
    }

    return(
        <View style={{paddingHorizontal:20 , paddingVertical:10}}>
            {pokemonStats.map((el,i)=>
                <View key={i} 
                    style={{
                        flexDirection:"row" , 
                        alignItems:"center" , 
                        backgroundColor:i%2==0?"#f2f2f2":"#fff" , 
                        padding:5}}
                >
                    <View style={{flex:1, width:100}}>
                        <Text style={{ color: "2f2f2f" , fontWeight:"bold", textTransform:"uppercase"}}>{formatWords(el.stat.name)}</Text>
                    </View>
                    <View style={{flex:1 , paddingHorizontal:20}}>
                        <ProgressBar progress={el.base_stat/250} color={"green"} />
                    </View>
                </View>
            )}
        </View>
    )
}


export default BaseStats