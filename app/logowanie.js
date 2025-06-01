import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function Logowanie() {
  const [login, setLogin] = useState('');
  const [haslo, setHaslo] = useState('');
  const [blad, setBlad] = useState(null);

  const zaloguj = () => {
    if (login === 'klaudia' && haslo === '12345') {
      router.replace('/(tabs)');
    } else {
      setBlad('Nieprawidłowy login lub hasło');
    }
  };

  return (
    <View style={style.container}>
      <Text style={style.tytul}>Witaj ponownie!</Text>

      <TextInput
        style={style.input}
        placeholder="Login"
        placeholderTextColor="#888"
        value={login}
        onChangeText={setLogin}
      />

      <TextInput
        style={style.input}
        placeholder="Hasło"
        placeholderTextColor="#888"
        secureTextEntry
        value={haslo}
        onChangeText={setHaslo}
      />

      {blad && <Text style={style.blad}>{blad}</Text>}

      <TouchableOpacity style={style.przycisk} onPress={zaloguj}>
        <Text style={style.przyciskText}>Zaloguj się</Text>
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 32,
    backgroundColor: '#FFF8F0',
  },
  tytul: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    backgroundColor: '#ffffff',
    borderColor: '#AEDFF7', 
    borderWidth: 1,
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    marginBottom: 20,
    color: '#333',
  },
  przycisk: {
    backgroundColor: '#F7C8E0', 
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  przyciskText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  blad: {
    color: '#E76617', 
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: '600',
  },
});
