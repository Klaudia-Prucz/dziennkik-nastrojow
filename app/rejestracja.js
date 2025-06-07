import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { auth } from '../firebaseConfig';

export default function Rejestracja() {
  const [email, setEmail] = useState('');
  const [haslo, setHaslo] = useState('');
  const [blad, setBlad] = useState(null);
  const router = useRouter();

  const zarejestruj = async () => {
    setBlad(null);
    try {
      await createUserWithEmailAndPassword(auth, email, haslo);
      router.replace('/(tabs)/strona-glowna');
    } catch (error) {
      setBlad('Rejestracja nie powiodła się: ' + error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.inner}
      >
        <Image
          source={require('../assets/images/beztla.png')}
          style={styles.logo}
        />

        <Text style={styles.tytul}>Załóż konto</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Hasło"
          placeholderTextColor="#888"
          secureTextEntry
          value={haslo}
          onChangeText={setHaslo}
        />

        {blad && <Text style={styles.blad}>{blad}</Text>}

        <TouchableOpacity style={styles.przycisk} onPress={zarejestruj}>
          <Text style={styles.przyciskText}>Zarejestruj się</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push('/logowanie')}
          style={styles.linkButton}
        >
          <Text style={styles.linkText}>lub zaloguj się</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F0',
  },
  inner: {
    justifyContent: 'center',
    padding: 32,
    flex: 1,
  },
  logo: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 10,
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
  linkButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  linkText: {
    color: '#888',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
