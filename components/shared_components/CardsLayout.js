import React from "react";
import {View , Text , Image} from "react-native"
import { formatWords } from "../helpers/textFormat.helper";

export const SearchCardLayout = (props) => {

    const {type , data , url} = props

    return(
        <View
            style={{
                flexDirection:"row",
                alignItems:"center",
                backgroundColor:"#f2f2f2",
                borderRadius:10,
                overflow:"hidden",
                height:50
            }}
        >   
            {type==="result"? 
            <View
                style={{
                    backgroundColor:"#F93318",
                    borderRadius:50,
                    paddingVertical:5,
                    paddingHorizontal:10,
                    height:30,
                    marginLeft:20
                }}
            >
                <Text 
                    style={{
                        fontSize:15,
                        fontWeight:"bold",
                        color:"#fff"
                    }}
                >#N {data.id}</Text>
            </View>:null}
            <Image
                source={{uri:url}}
                style={{
                    height:"100%",
                    width:120,
                    marginHorizontal:20
                }}
            />
            <View
                style={{
                    flex:1,
                    backgroundColor:"#F93318",
                    height:50,
                    alignItems:"center",
                    justifyContent:"center"
                }}
            >
                <Text style={{textTransform:"capitalize" , color:"#fff"}}>{formatWords(data?.name)}</Text>
            </View>
        </View>
    )
}