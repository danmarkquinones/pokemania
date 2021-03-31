import React , {useEffect , useState} from "react";
import { View ,Text} from "react-native";
import axios from "axios";
import { FlatList } from "react-native-gesture-handler";

const ItemLists=(props)=>{

    const {navigation} = props
    const [itemsLists,setItemLists] = useState([])


    useEffect(()=>{
        axios.get(`https://pokeapi.co/api/v2/item/?offset=0&limit=10`)
        .then(res => {
            res.data.forEach(item => {
                axios.get(item.url)
                .then(res=>{
                    setItemLists([res.data , ...itemsLists])
                    // console.log(res.data)
                }).catch(e=>console.log("ERROR"))
            });
        }).catch(e => console.log('FETCH FAILED',e))    
    },[])


    // console.log("UPDATE ITEM LIST" , itemsLists)
    return(
        <View>
            <Text>ITEM LISTS</Text>
            {itemsLists.length?
                <FlatList
                    data={itemsLists}
                    keyExtractor={(item,i)=>item.id.toString()}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item})=>{
                        return(
                            <View>
                                <Text>{item.name}</Text>
                            </View>
                        )
                    }}
                />
            :null}
        </View>
    )
}

export default ItemLists