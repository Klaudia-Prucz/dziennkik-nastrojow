import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Button,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

export default function Logowanie() {
  const [login, setLogin] = useState('');
  const [haslo, setHaslo] = useState('');
  const router = useRouter();

  const zaloguj = () => {
    if (login === 'klaudia' && haslo === '12345') {
      router.replace('/(tabs)/strona-glowna');
    } else {
      Alert.alert('Błąd logowania', 'Nieprawidłowy login lub hasło');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.tytul}>Dziennik Nastrojów</Text>
          <Text style={styles.podtytul}>Zaloguj się do aplikacji</Text>

          <TextInput
            style={styles.input}
            placeholder="Login"
            value={login}
            onChangeText={setLogin}
          />
          <TextInput
            style={styles.input}
            placeholder="Hasło"
            secureTextEntry
            value={haslo}
            onChangeText={setHaslo}
          />

          <View style={styles.przycisk}>
            <Button title="Zaloguj się" onPress={zaloguj} color="#E76617" />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF8F0',
    flexGrow: 1,
    justifyContent: 'center',
    padding: 32,
  },
  tytul: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#E76617',
    marginBottom: 10,
    textAlign: 'center',
  },
  podtytul: {
    fontSize: 18,
    marginBottom: 24,
    textAlign: 'center',
    color: '#666',
  },
  input: {
    backgroundColor: '#ffffff',
    borderColor: '#AEDFF7',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
  },
  przycisk: {
    marginTop: 10,
  },
});
