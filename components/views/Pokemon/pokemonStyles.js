import { StyleSheet } from 'react-native';

export const pokemonStyles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#f2f2f2"
        // backgroundColor:
    },
    displayRow:{
        flexDirection:"row",
        alignItems:"center"
    },
    viewTypeContainer:{
        flex:1,
        alignItems:"center",
        justifyContent:"flex-end"
    },
    card:{
        flex:1,
        backgroundColor:"#fff",
        margin:5,
        // width:100,
        borderBottomLeftRadius: 10,
        borderTopRightRadius:10,
        overflow:"hidden",
        shadowColor:"gray",
        shadowRadius:7
    },
    cardHeader:{
        padding:8,
        flexDirection:'row',
        backgroundColor:'coral',
        alignItems:"center",
    },
    cardFooter:{
        padding:8,
        flexDirection:'row',
        alignItems:"center",
        flex:1
    },
    pokemonName:{
        flex:1,
        alignItems:'flex-start',
        fontWeight:'bold',
        color:"#fff"
    },
    pokemonId:{
        textAlign:"center",
        alignItems:'flex-end',
        backgroundColor:'#fff',
        width:'auto',
        borderRadius:50,
        fontWeight:'bold',
        paddingHorizontal:5
    },
    pokemonImage:{
        padding:10,
        alignItems:"center"
    },
    pokemonTypes:{
        flex:1,
        marginHorizontal:1
    },
    pokemonView:{
        flex:3,
        alignItems:"flex-end"
    },
    singleViewPokemonContainer:{
        // margin:10,
        flexDirection:"column"
    },
    singleViewPokemonHeadCont:{
        backgroundColor:"coral",
        flexDirection:"row",
    },
    singleViewPokemonName:{
        justifyContent:"center",
        flexDirection:"row",
        padding:10,
        alignItems:"center",
        flex:1
    },
    singleViewPokemonPrevCont:{
        width:50
    },
    singleViewPokemonNextCont:{
        width:50
    },
    singleViewPokemonNext:{
        backgroundColor:"tomato",
        padding:15,
        // marginLeft:20,
        justifyContent:"center",
        borderStyle: 'solid',
    },
    singleViewPokemonPrev:{
        backgroundColor:"tomato",
        padding:15,
        // marginRight:20,
    },
    singleViewPokemonHeader:{
        flexDirection:"row",
        alignItems:"center",
        height:200,
        paddingHorizontal:10,
        // paddingTop:10
    },
    singleViewPokemonDetails:{
        // marginTop:30,
        justifyContent:"flex-start",
        flex:1,
    },
    singleViewPokemonImageCont:{
        width:200,
        height:200,
        overflow:"visible",
    },
    singleViewPokemonImage:{
        // marginTop:10
    },
    singleViewPokemonContent:{
        backgroundColor : "#fff",
    },
    singleViewPokemonContentTitle:{
        position:"relative",
        padding:10
    },
    singleViewPokemonContentTitleText:{
        color:"#2f2f2f",
        backgroundColor:"#fff",
        fontWeight:"bold",
        textTransform:"uppercase",
        position:"absolute",
        top:2,
        left:15,
        zIndex:1,
        paddingHorizontal:7
    },
    singleViewDivider:{
        height: 5 ,
        backgroundColor:"tomato",
        marginHorizontal:-10,
    },
    breedCardHeaderText:{
        color:"#fff",
        fontWeight:"bold",
        textAlign:"center",
        fontSize:15
    },
    breedCardContent:{
        paddingVertical : 5,
        justifyContent:"center",
        backgroundColor:"#fff",
        borderRadius:5,
    },
    breedCardContentText:{
        textAlign:"center",
        // textTransform:"capitalize",
        fontSize:15
    },
    filterTextFieldDiv:{
        flex:1,
        borderWidth:1,
        borderColor:"tomato",
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        padding:2,
        backgroundColor:"tomato",
        borderRadius:5,
    },
    filterTextField:{
        backgroundColor:"#fff",
        height:30,
        // width:100,
        flex:1,
        borderRadius:5,
        paddingHorizontal:10
    },
    filterSubmitButtonView:{
        backgroundColor:"tomato" , 
        borderRadius:5 , 
        // flex:1,
        display:"flex" , 
        alignItems:"center" , 
        paddingHorizontal:20,
        paddingVertical:5,
    },
    typeListView:{
        flex:1,
        // width:100,
        margin:5,
        paddingVertical:5,
        paddingHorizontal:10,
        // display:"flex",
        // flexDirection:"row",
        // alignItems:"center",
        borderRadius:4
    }
})