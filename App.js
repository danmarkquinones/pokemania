import React from 'react';
import { StyleSheet} from 'react-native';
import { AsyncStoreContextProvider } from './components/context/asyncStorageContext';
import { PokemonContextProvider } from './components/context/pokemonContext';
import {SearchesContextContextProvider } from './components/context/searchesContext';
// import Home  from "./components/home"
import Navigation from "./components/routes/Navigation"

export default function App() {
  return (
    <AsyncStoreContextProvider>
      <SearchesContextContextProvider>
        <PokemonContextProvider>
          <Navigation/>
        </PokemonContextProvider>
      </SearchesContextContextProvider>
    </AsyncStoreContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
