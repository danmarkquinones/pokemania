import AsyncStorage from '@react-native-async-storage/async-storage';
import React , {useState , useEffect} from 'react'

export const SearchesContext = React.createContext();

export const SearchesContextContextProvider = (props) => {
    const [results , setResults] = useState({text:"" , loading:false , data:"" , status:""})
    const [recentSearches , setRecentSearches] = useState([])
    
    // console.log("Recent Search",recentSearches)

    useEffect(()=>{
        AsyncStorage.getItem('recentSearches').then(value=>{
            if(value===null){
                AsyncStorage.setItem("recentSearches",JSON.stringify([]))
            }else{
                setRecentSearches(JSON.parse(value))
            }
        });
    },[])

    return (
        <SearchesContext.Provider value={[results , setResults , recentSearches , setRecentSearches]}>
            {props.children}
        </SearchesContext.Provider>
    )
}
