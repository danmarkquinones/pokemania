import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    container:{
        // flex: 1,
        backgroundColor: '#f2f2f2',
        paddingHorizontal:10,
        paddingVertical:30
    },
    customPrimaryBtn:{
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'coral',
        paddingHorizontal:5,
        paddingVertical:2,
        borderRadius:5,
    },
    customPrimaryText:{
        marginLeft:5,
        color:'#fff',
        fontSize:12,
        fontWeight:"bold"
    }
})