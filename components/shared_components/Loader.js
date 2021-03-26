import React from "react";
import { View, Text, Image } from "react-native";

const Loader = (props) => {

    const {length} = props
    const arr = [...Array(length)]
    
    return(
        <View
            style={{
                flex:1,
                justifyContent:"center",
                alignItems:"center",
                flexDirection:"row"
            }}
        >
            {arr.map((el,i)=>
                <Image
                    key={i}
                    source={require("../../assets/images/loader.gif")}
                    style={{
                        height:50,
                        width:50
                    }}
                />
            )}
        </View>
    )
}

export default Loader