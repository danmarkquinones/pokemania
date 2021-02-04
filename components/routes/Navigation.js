import React , {useState , useEffect} from "react";
import {navigationStyles} from "./navigationStyles"
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

import CustomHeader from "../shared_components/CustomHeader"
import PokemonLists from "../views/Pokemon/PokemonLists"
import PokemonSingle from "../views/Pokemon/PokemonSingle"
import ItemLists from "../views/Items/ItemLists"
import PokemonSearch from "../views/Pokemon/PokemonSearch";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const headerTitle = (title , navigation) => {
    let obj = {headerTitle:()=><CustomHeader title={title} navigation={navigation}/>}
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
            header="Items"
        />
    </Stack.Navigator>
)

const AppTabNavigator = () => (
    <Tab.Navigator initialRouteName="Home" activeColor="black" shifting="false">

        <Tab.Screen name="PokemonStackNavigator" component={PokemonStackNavigator} 
            options={{
                tabBarLabel: 'Pokemons',
                tabBarIcon: ({ color }) => (
                    <MaterialIcons name="home" color={color} size={26} />
                )
            }}
        />
        <Tab.Screen name="ItemStackNavigator" component={ItemStackNavigator}
            options={{
                tabBarLabel: 'Items',
                tabBarIcon: ({ color }) => (
                    <MaterialIcons name="star" color={color} size={26} />
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