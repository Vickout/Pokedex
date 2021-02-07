import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { TouchableOpacity, Text, TextInput, KeyboardAvoidingView, Image, StyleSheet, View } from 'react-native';

const SignUp: React.FC = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [isMaleFocus, setMaleFocus] = useState(false);
  const [isFemaleFocus, setFemaleFocus] = useState(false);

  function handleSubmit() {
    const trainerData = {
      name,
      age,
      gender,
    }
    console.log(trainerData);
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
        <Image
          style={styles.logo}
          source={{ uri: 'https://image.flaticon.com/icons/png/128/914/914726.png' }}
        />
        <Text style={styles.label}>Treinador Pokemón</Text>
        <TextInput
          style={styles.input}
          value={name}
          placeholder="Digite seu nome"
          onChangeText={name => setName(name)}
        />
        <Text style={styles.label}>Idade</Text>
        <TextInput
          style={styles.input}
          value={age}
          placeholder="Digite sua idade"
          onChangeText={age => setAge(age)}
          keyboardType="numeric"
        />
        <Text style={styles.label}>Gênero</Text>
        <View style={styles.genderContainer}>
          <View style={[
            {
              alignItems: 'center',
              borderWidth: 3,
              borderColor: '#400753',
              paddingHorizontal: 4,
            }, isMaleFocus ? {
              borderColor: '#fcbf10',
              borderWidth: 3,
              borderRadius: 8,
              paddingHorizontal: 4,
            } : {}]}>
            <TouchableOpacity onPress={() => {
              setGender('masculino');
              setMaleFocus(true);
              setFemaleFocus(false);
            }}>
              <Image
                style={styles.genderImage}
                source={{ uri: 'https://icon-library.com/images/pokemon-trainer-icon/pokemon-trainer-icon-4.jpg' }}
              />
            </TouchableOpacity>
            <Text style={styles.label}>Masculino</Text>
          </View>
          <View  style={[
            {
              alignItems: 'center',
              borderWidth: 3,
              borderColor: '#400753',
              paddingHorizontal: 4,
            }, isFemaleFocus ? {
              borderColor: '#fcbf10',
              borderWidth: 3,
              borderRadius: 8,
              paddingHorizontal: 4,
            } : {}]}>
            <TouchableOpacity  onPress={() => {
              setGender('feminino');
              setFemaleFocus(true);
              setMaleFocus(false);
            }}>
              <Image
                style={styles.genderImage}
                source={{ uri: 'https://images6.fanpop.com/image/photos/40000000/Female-Trainer-Icon-alola-region-40017892-180-180.png' }}
              />
            </TouchableOpacity>
            <Text style={styles.label}>Feminino</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={() => {
          handleSubmit();
          navigation.navigate('Profile', { name, age, gender });
        }}>
          <Text style={styles.submitButtonText}>Cadastrar</Text>
        </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}



export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 20,
    backgroundColor: '#400753',
  },

  logo: {
    height: 80,
    width: 60,
    marginBottom: 8,
    resizeMode: 'contain',
    alignSelf: 'center',
  },

  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
    color: '#fcbf10'
  },

  input: {
    paddingHorizontal: 12,
    paddingVertical: 16,
    marginBottom: 15,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#fcbf10',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    fontSize: 15,
    color: '#fff',
  },

  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  genderImage: {
    height: 120,
    width: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
  },

  submitButton: {
    backgroundColor: '#fcbf10',
    borderWidth: 0,
    borderRadius: 4,
    padding: 16,
    marginTop: 15,
    alignItems: 'center'
  },

  submitButtonText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 18,
  },
});
