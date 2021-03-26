import AsyncStorage from '@react-native-async-storage/async-storage';
import React , {useState , useEffect} from 'react'

export const AsyncStoreContext = React.createContext();

export const AsyncStoreContextProvider = (props) => {
    const [favorites , setFavorites] = useState([])
    
    useEffect(()=>{
        AsyncStorage.getItem('favoritesPokemons').then(value=>{
            if(value===null){
                AsyncStorage.setItem("favoritesPokemons",JSON.stringify([]))
            }else{
                setFavorites(JSON.parse(value))
            }
        });
    },[])

    return (
        <AsyncStoreContext.Provider value={[favorites , setFavorites]}>
            {props.children}
        </AsyncStoreContext.Provider>
    )
}
