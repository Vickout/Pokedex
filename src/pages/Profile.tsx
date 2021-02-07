import React from 'react';
import { SafeAreaView, Image, Text, StyleSheet, StatusBar, View, TouchableOpacity } from 'react-native';
import { Feather, MaterialCommunityIcons, SimpleLineIcons, AntDesign } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

type ParamList = {
  SignUp: {
    name: string;
    age: string;
    gender: string;
  };
};

const Profile: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<ParamList, 'SignUp'>>();

  const { name, age, gender } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      {gender === 'masculino' && (
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{uri: 'https://static.wikia.nocookie.net/pokemon/images/e/ef/SM-Elio.png/revision/latest?cb=20161115163445' }}
          />
        </View>
      )}
      {gender === 'feminino' && (
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{uri: 'https://i.pinimg.com/originals/27/f5/3c/27f53c427fb7d1d20a256411bb0df2e4.png' }}
          />
        </View>
      )}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button}>
          <Feather name="heart" size={20} color='#c13018' />
          <Text style={styles.textButton}>Favoritos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <MaterialCommunityIcons name="pokeball" size={20} color='#c13018' />
          <Text style={styles.textButton}>Meus pokemons</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Pokedex')}>
          <AntDesign name="find" size={20} color='#c13018' />
          <Text style={styles.textButton}>Pokedex</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <SimpleLineIcons name="badge" size={20} color='#c13018' />
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
    backgroundColor: '#00c89b',
  },

  imageContainer: {
    backgroundColor: "rgba( 255, 255, 255, 0.5)",
    height: 300,
    width: 300,
    borderRadius: 150,
    marginTop: 20,
    alignSelf: 'center',
  },

  image: {
    height: 300,
    width: 200,
    resizeMode: 'contain',
    alignSelf: 'center',
  },

  buttonsContainer: {
    flex: 1,
    marginTop: 15,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 10,
  },

  button: {
    flexDirection: 'row',
    borderColor: '#c13018',
    borderBottomWidth: 3,
    padding: 10,
    marginBottom: 10,
  },

  textButton: {
    flex: 1,
    textAlign: 'center',
    color: '#c13018',
  },

  pokedexIcon: {
    height: 10,
    width: 20,
  },
});

export default Profile;
