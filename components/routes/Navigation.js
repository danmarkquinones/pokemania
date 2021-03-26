import React , {useState , useEffect} from "react";
import {navigationStyles} from "./navigationStyles"
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons , MaterialCommunityIcons } from '@expo/vector-icons';

import CustomHeader from "../shared_components/CustomHeader"
import PokemonLists from "../views/Pokemon/PokemonLists"
import PokemonSingle from "../views/Pokemon/PokemonSingle"
import ItemLists from "../views/Items/ItemLists"
import PokemonSearch from "../views/Pokemon/PokemonSearch";
import FavoriteLists from "../views/Favorites/FavoriteLists";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const headerTitle = (title , navigation) => {
    let obj = {
        headerTitle:()=><CustomHeader title={title} navigation={navigation}/> , 
        headerStyle:{
            backgroundColor:"#F93318",
        }
    }
    return obj
}

const PokemonStackNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="PokemonLists"
            component={PokemonLists}
            options={({navigation})=>headerTitle('Pokedex' , navigation)}
        />
        <Stack.Screen
            name="PokemonSingle"
            component={PokemonSingle}
            options={({navigation})=>headerTitle('Pokemon Details' , navigation)}
        /> 
        <Stack.Screen
            name="PokemonSearch"
            component={PokemonSearch}
            options={({navigation})=>headerTitle('Search Pokemon' , navigation)}
        />
    </Stack.Navigator>
)

const ItemStackNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="ItemLists"
            component={ItemLists}
            // header="Items"
            options={({navigation})=>headerTitle('Items' , navigation)}
        />
        {/* <Stack.Screen
            name="PokemonSingle"
            component={PokemonSingle}
            options={({navigation})=>headerTitle('Pokemon Details' , navigation)}
        />  */}
    </Stack.Navigator>
)

const FavoritesStackNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="FavoriteLists"
            component={FavoriteLists}
            options={({navigation})=>headerTitle('Favorites' , navigation)}
        />
    </Stack.Navigator>
)

const AppTabNavigator = () => (
    <Tab.Navigator initialRouteName="Home" shifting="true" 
        tabBarOptions={{
            activeTintColor:"#F93318",
        }}
    >

        <Tab.Screen name="PokemonStackNavigator" component={PokemonStackNavigator} 
            options={{
                tabBarLabel: '',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="pokeball" color={color} size={26} />
                )
            }}
        />
        <Tab.Screen name="ItemStackNavigator" component={ItemStackNavigator}
            options={{
                tabBarLabel: '',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="fruit-cherries" color={color} size={26} />
                )
            }} 
        />
        <Tab.Screen name="FavoritesStackNavigator" component={FavoritesStackNavigator}
            options={{
                tabBarLabel: '',
                tabBarIcon: ({ color }) => (
                    <MaterialIcons name="favorite" color={color} size={26} />
                )
            }} 
        />
    </Tab.Navigator>
)

const RootStackNavigator = (props) => {
    return(
        <Stack.Navigator headerMode="none" mode="modal" screenOptions={{animationEnabled:false}}>
            <Stack.Screen name='AppTabNavigator' component={AppTabNavigator}/>
        </Stack.Navigator>
    ) 
}

const Navigation = (props) => {
    return(
        <NavigationContainer>
            <RootStackNavigator/>
        </NavigationContainer>
    )
};

export default Navigation