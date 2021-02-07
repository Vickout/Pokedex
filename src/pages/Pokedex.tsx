import React, { useCallback, useEffect, useState } from 'react';
import { Text, SafeAreaView, FlatList, View, StyleSheet, Image, StatusBar, TouchableOpacity, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';

import api from '../services/api';
import { useNavigation } from '@react-navigation/native';

interface PokemonsProps {
  name: string;
  url: string;
}

interface PokemonSearchedProps {
  name: string;
  id: number;
  urlImage: string;
}

interface PokemonTypes {
  type: {
    name: string;
  }
}

const Pokedex: React.FC = () => {
  const navigation = useNavigation();

  const [pokemons, setPokemons] = useState<PokemonsProps[]>([]);
  const [count, setCount] = useState(0);
  const [shuldLoad, setShuldLoad] = useState(true);
  const [loading, setLoading] = useState(false);
  const [pressedButton, setPressedButton] = useState(false);
  const [types, seTypes] = useState<PokemonTypes[]>([]);
  const [searchedPokemon, setSearchedPokemon] = useState<PokemonSearchedProps | null>(null);
  const [searchedName, setSearchedName] = useState('');


  // const loadPokemonType = useCallback(async (number: number): Promise<void>  => {
  //   const response = await api.get(`pokemon/${number}/`);

  //   setTypes(response)
  // }, [])

  const searchPokemon = useCallback(async (): Promise<void> => {
    await api.get(`pokemon/${searchedName}`).then(response => {
      const pokemonFinded = response.data

      if(pokemonFinded){
        pokemonFinded.urlImage = `https://pokeres.bastionbot.org/images/pokemon/${pokemonFinded.id}.png`}

        setSearchedPokemon(pokemonFinded);

    })
  }, [])

  const loadPokemons = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await api.get(`pokemon?offset=${count}&limit=20`)

      if (!response.data.length) {
        setShuldLoad(false);
      }

      setPokemons([...pokemons, ...response.data.results]);
      setCount(count => count + 20);
    } catch (error) {
      console.log({ err: error.message })
    }
    setLoading(false);
  }, [count])

  useEffect(() => {
    loadPokemons();
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
      <View style={styles.searchContainer}>
        <View style={styles.searchBarView}>
          <Feather
            style={{ marginRight: 16 }}
            name="search"
            size={25}
          />
          <TextInput style={styles.searchInput}
            placeholder="Procure por pokémons..."
            defaultValue={searchedName}
            onChangeText={text => setSearchedName(text)}
          />
        </View>
        <TouchableOpacity style={styles.searchButton}
          onPress={() => {
            searchPokemon();
            setPressedButton(true);
          }}
        >
          <Text
            style={{
              color: '#fff',
            }}
          >
            Buscar
          </Text>
        </TouchableOpacity>
      </View>

      {/* {pressedButton && searchedPokemon !== null ? (
          <View style={styles.pokemonContainer}>
            <View style={styles.pokemonContent}>
              <Image style={styles.pokemonImage} source={{ uri: searchedPokemon.urlImage }} />

              <Text style={styles.pokemonName}>{searchedPokemon.name[0].toUpperCase() + searchedPokemon.name.substr(1)}</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#ddd" />
          </View>
         ):()} */}
      <FlatList
      data={pokemons}
      keyExtractor={pokemon => pokemon.name}
      onEndReached={loadPokemons}
      onEndReachedThreshold={0.2}
      renderItem={({ item: pokemon }) => {
        const { name, url } = pokemon;

        const pokemonName = name[0].toUpperCase() + name.substr(1)

        const pokemonNumber = url.replace('https://pokeapi.co/api/v2/pokemon/', '').replace('/', '');
        const pokemonRoute = url.replace('https://pokeapi.co/api/v2', '');

        const imageUrl = `https://pokeres.bastionbot.org/images/pokemon/${pokemonNumber}.png`

        // const tipos = loadPokemonType(Number(pokemonNumber));

        return (
          <TouchableOpacity
            style={styles.pokemonContainer}
            onPress={() => navigation.navigate('Pokemon', { url: pokemonRoute, imageUrl, name: pokemonName }) }
          >
            <View style={styles.pokemonContent}>
              <Image style={styles.pokemonImage} source={{ uri: imageUrl }} />
              <Text style={styles.pokemonName}>{pokemonName}</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#ddd" />
          </TouchableOpacity>
        )
      }}
    />

    </SafeAreaView>
  );
};

export default Pokedex;

const styles = StyleSheet.create({
  searchContainer: {
    margin: 16,
    flexDirection: 'row',
  },

  searchBarView: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    padding: 8,
    color: '#666360',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  searchInput: {
    flex: 1,
    height: 40,
  },

  searchButton: {
    width: 80,
    backgroundColor: '#ff5f00',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  pokemonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#fff'
  },

  pokemonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  pokemonImage: {
    width: 60,
    height: 60,
    marginRight: 20,
  },

  pokemonName: {
    fontSize: 18,
  },
});
