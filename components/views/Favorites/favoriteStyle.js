import { StyleSheet } from 'react-native';

export const favoriteStyles = StyleSheet.create({
    card :{
        flexDirection:"row",
        alignItems:"center",
        backgroundColor:"#fff",
        marginTop:10,
        paddingVertical:5,
        paddingHorizontal:20,
        height:80,
        overflow:"hidden"
    },
    image:{
        height:90,
        width:90,
    },
    pokemonName:{
        fontWeight:"bold",
        fontSize:20,
        textTransform:"capitalize",
        marginHorizontal:30
    },
    pokemonTypes:{
        flexDirection:"row",
        marginHorizontal:30
    },
    actions :{
        backgroundColor:"coral",
        borderRadius:50,
        padding:5,
        marginHorizontal:5
    }
})
