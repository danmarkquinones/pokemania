import React from "react";
import { Text, View } from "react-native";

const Fallbacks = (props) => {
    const {text} = props
    return(
        <View
            style={{
                flex:1,
                justifyContent:"center",
                alignItems:"center",
                paddingVertical:10
            }}
        >
            <Text
                style={{
                    fontSize:15,
                    color:"gray",
                    fontWeight:"bold"
                }}
            >{text}</Text>
        </View>
    )
}

export default Fallbacks