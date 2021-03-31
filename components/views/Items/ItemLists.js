import React , {useEffect , useState} from "react";
import { View ,Text} from "react-native";
import axios from "axios";
import { FlatList } from "react-native-gesture-handler";
import Loader from "../../shared_components/Loader";

const ItemLists=(props)=>{

    const {navigation} = props
    const [itemsLists,setItemLists] = useState([])


    useEffect(()=>{
        axios.get(`https://pokeapi.co/api/v2/item/?offset=0&limit=10`)
        .then(res => {
            console.log(res.data)
            // setItemLists([...res.data.results])
            var itemArr = []
            res.data.results.forEach(item => {
                axios.get(item.url)
                .then(res=>{
                    itemArr.push(res)
                    console.log(itemArr.length)
                    if(itemArr.length === 10){
                        setItemLists(itemArr)
                    }
                }).catch(e=>console.log("ERROR"))
            });
            
        }).catch(e => console.log('FETCH FAILED',e))    
    },[])


    // console.log("UPDATE ITEM LIST" , itemsLists)
    return(
        <View style={{flex:1 , backgroundColor:"#fff"}}>
            {/* <Text>ITEM LISTS</Text> */}
            {/* {itemsLists.length?
                <FlatList
                    data={itemsLists}
                    keyExtractor={(item,i)=>item.id}
                    numColumns={1}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item})=>{
                        return(
                            <View>
                                <Text>{item.name}</Text>
                            </View>
                        )
                    }}
                />
            :null} */}
            <View style={{flex:1 , height:100, display:"flex" , alignItems:"center" , justifyContent:"center"}}>
                <View >
                    <Loader length={3}/>
                    <Text style={{textAlign:"center"  ,fontSize:25 , color:"gray" , fontWeight:"bold"}}>Coming Soon...</Text>
                    <Loader length={3}/>
                </View>
            </View>
        </View>
    )
}

export default ItemLists