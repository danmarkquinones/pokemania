import React , {useEffect , useState} from "react";
import { Text, View ,TouchableOpacity } from "react-native";
import axios from "axios";
import Loader from "../../../shared_components/Loader";
import Fallbacks from "../../../shared_components/Fallbacks";
import { formatWords } from "../../../helpers/textFormat.helper";
import { Chip } from "react-native-paper";

const Encounter = (props) => {

    const {pokemon} = props
    const [loading , setLoading] = useState(false)
    const [encounterLocation , setEncounterLocation] = useState([])
    
    useEffect(()=>{
        setLoading(true)
        if(pokemon){
            axios.get(pokemon.location_area_encounters)
            .then(res => {
                console.log("LCOATION MO TO",res.data)
                setEncounterLocation(res.data)
                setLoading(false)
            }).catch(e => console.log('FETCH FAILED',e))
        }
    },[pokemon])
    return(
        <View
            style={{
                paddingHorizontal:20
            }}
        >
            {loading?
                <Fallbacks text="Fetching Locations..."/>
            :encounterLocation.length?
                <View>
                    {encounterLocation.map((loc,i)=>
                        <Chip
                            key={i}
                            style={{
                                marginVertical:2,
                                overflow:"hidden"
                            }}
                            icon="information" onPress={() => console.log(loc)}
                        >
                            {/* <View> */}
                                <Text ellipsizeMode="tail" style={{textTransform:"capitalize"}}>{formatWords(loc.location_area.name)}</Text>
                            {/* </View> */}
                        </Chip>
                    )}
                </View>
            :<Fallbacks text="Location Unavailable"/>
            }
        </View>
    )
}

export default Encounter