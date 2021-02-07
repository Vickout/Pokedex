import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, View, Image, Text, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import api from '../services/api';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

type ParamList = {
  Pokedex: {
    name: string;
    url: string;
    imageUrl: string;
  };
};

interface Pokemon {
  id: number;
  base_experience: number;
  name: string;
  types: Array<{
    type: {
      name: string;
    }
  }>;
  moves: Array<{
    move: {
      name: string;
    }
  }>;
  weight: number;
  stats: Array<{
    base_stat: number;
    stat: {
      name: string
    }
  }>;
}

const Pokemon: React.FC = () => {
  const route = useRoute<RouteProp<ParamList, 'Pokedex'>>();

  const { name, url, imageUrl } = route.params;

  const [pokemon, setPokemon] = useState<Pokemon>();

  const handlePokemon = useCallback(async (): Promise<void> => {
    const response = await api.get(`${url}`)

    setPokemon(response.data);
  }, [])

  useEffect(() => {
    handlePokemon();
  }, [])

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: imageUrl }} />
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.nameContainer}>
        <Text style={styles.pokemonName}>{name}</Text>
        <Text style={styles.weight}>Peso: {pokemon?.weight}</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <View style={styles.statusContainer}>
            {pokemon?.stats.map(stat => {
              return (
                <View key={stat.stat.name} >
                  <Text
                    style={styles.statusName}
                  >{`${stat.stat.name}: ${stat.base_stat}`}</Text>
                  <View style={styles.progressBar}>
                    <View style={[styles.progressBar, {backgroundColor: '#7298a1', width: stat.base_stat}]}></View>
                  </View>
                </View>
              )
            })}
          <View style={styles.buttons}>
            <TouchableOpacity style={[styles.containerTextButton, {backgroundColor: '#eb5b5c'}]}>
              <Feather name="heart" size={20} color='#fff' />
              <Text style={styles.textButton}>Favoritos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.containerTextButton, {backgroundColor: '#c13018'}]}>
              <MaterialCommunityIcons name="pokeball" size={20} color="#fff" />
              <Text style={styles.textButton}>Capturar</Text>
            </TouchableOpacity>
          </View>
          </View>
          <View style={styles.typeContainer}>
            {pokemon?.types.map(type => {
              return (
                <Text key={type.type.name} style={styles.type}>{type.type.name}</Text>
              )
            })}
            <View>
              <Text style={{marginBottom: 5, color: '#f5a319', textAlign: 'center'}}>Ataques</Text>
              <View style={styles.moveContainer}>
                <Text style={styles.move}>{pokemon?.moves[0].move.name}</Text>
                <Text style={styles.move}>{pokemon?.moves[1].move.name}</Text>
                <Text style={styles.move}>{pokemon?.moves[2].move.name}</Text>
                <Text style={styles.move}>{pokemon?.moves[3].move.name}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

    </SafeAreaView>
  );
}

export default Pokemon;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    backgroundColor: '#400753',
    alignItems: 'center',
  },

  imageContainer: {
    backgroundColor: "rgba( 153, 153, 153, 0.5)",
    height: 200,
    width: 200,
    borderRadius: 100,
    marginTop: 40
  },

  image: {
    height: 200,
    width: 200,
  },

  infoContainer: {
    position: 'absolute',
    bottom: 0,
    height: 350,
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    padding: 20,
  },

  nameContainer: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  pokemonName: {
    textAlign: 'center',
    fontSize: 30,
  },

  weight: {
    position: 'absolute',
    right: 0,
    bottom: 10,
    fontSize: 10,
    marginLeft: 20,
  },

  descriptionContainer: {
    flexDirection: 'row',
  },

  statusContainer: {
  },

  statusName: {
    marginBottom: 5,
  },

  progressBar: {
    width: 200,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ddd',
  },

  buttons: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  containerTextButton: {
    flexDirection: 'row',
    padding: 8,
    borderRadius: 5,
  },

  textButton: {
    marginLeft: 5,
    color: '#fff'
  },

  typeContainer: {
    flex: 1,
    alignItems: 'center',
  },

  type: {
    width: 60,
    height: 22,
    textAlign: 'center',
    backgroundColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 5,
    marginBottom: 10,
  },

  moveContainer: {
    flex: 1,
    alignSelf: 'center',
  },

  move: {
    marginBottom: 10,
    textAlign: 'center',
    borderWidth: 3,
    borderColor: '#f5a319',
    borderRadius: 5,
    padding: 3,
  },

});
