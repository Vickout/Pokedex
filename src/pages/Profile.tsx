import React from 'react';
import { SafeAreaView, Image, Text, StyleSheet, StatusBar, View, TouchableOpacity } from 'react-native';
import { Feather, MaterialCommunityIcons, SimpleLineIcons, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// Female Trainer: https://i.pinimg.com/originals/27/f5/3c/27f53c427fb7d1d20a256411bb0df2e4.png
const Profile: React.FC = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.image}
        source={{uri: 'https://static.wikia.nocookie.net/pokemon/images/e/ef/SM-Elio.png/revision/latest?cb=20161115163445' }}
      />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button}>
          <Feather name="heart" size={20} color='#fff' />
          <Text style={styles.textButton}>Favoritos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <MaterialCommunityIcons name="pokeball" size={20} color='#fff' />
          <Text style={styles.textButton}>Meus pokemons</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Pokedex')}>
          <AntDesign name="find" size={20} color='#fff' />
          <Text style={styles.textButton}>Pokedex</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <SimpleLineIcons name="badge" size={20} color='#fff' />
          <Text style={styles.textButton}>Insígnias</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },

  image: {
    height: 300,
    width: 200,
    resizeMode: 'contain',
    alignSelf: 'center',
  },

  buttonsContainer: {
    marginTop: 20,
    justifyContent: 'space-evenly',
  },

  button: {
    width: 150,
    flexDirection: 'row',
    backgroundColor: '#d11521',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },

  textButton: {
    flex: 1,
    textAlign: 'center',
    color: '#fff',
  },

  pokedexIcon: {
    height: 10,
    width: 20,
  },
});

export default Profile;
