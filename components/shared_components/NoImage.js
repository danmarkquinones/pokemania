import React from "react";
import { ImageBackground, Text, View } from "react-native";
import noimage from "../../assets/images/no-image.jpg"

const NoImage = (props) => {

    const {name , dimension} = props
    return(
        <View
            style={{
                height:dimension,
                width:dimension,
                backgroundColor:"#f2f2f2",
                alignItems:"center",
                justifyContent:"center",
                padding:5
            }}
        >
            <ImageBackground source={noimage}
                style={{
                    flex: 1,
                    resizeMode: "cover",
                    justifyContent: "center"
                }}
            >
                <Text style={{textAlign:"center"}}>{name}</Text>
            </ImageBackground>
        </View>
    )
}

export default NoImage