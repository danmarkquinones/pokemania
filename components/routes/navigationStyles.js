import { StyleSheet } from 'react-native';

export const navigationStyles = StyleSheet.create({
    header: {
        // flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-end',
        // backgroundColor:'#F93318'
    },
    headerIcon:{
        // flex:1,
        marginHorizontal:5,
        backgroundColor:"#fff",
        padding:5,
        borderRadius:50,
        alignItems:"center",
        justifyContent:"center"
    },
    headerText :{
        flex:1,
        // fontFamily:'ubuntu-regular',
        fontSize:18,
        // padding : 17,
        color:'blue'
    },
    containerRow:{
        flex:1,
        flexDirection:"row",
        alignItems:"center",
        // justifyContent:"center"
    },
    searchIcon:{
        // color:"#fff"
        // backgroundColor:"#fff",
        // borderColor:"red",
        // borderWidth:2,
        // borderRadius:10,
        // padding:3,
    },
    title:{
        color:"#fff",
        fontWeight:"bold",
        fontSize:20
    }
})