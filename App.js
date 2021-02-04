import React from 'react';
import { StyleSheet} from 'react-native';
import { PokemonContextProvider } from './components/context/pokemonContext';
// import Home  from "./components/home"
import Navigation from "./components/routes/Navigation"

export default function App() {
  return (
    <PokemonContextProvider>
      <Navigation/>
    </PokemonContextProvider>
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
