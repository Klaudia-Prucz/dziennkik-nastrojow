import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    // Można tutaj dodać sprawdzanie zalogowania, jeśli potrzebne
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Witaj w aplikacji</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/logowanie')}
      >
        <Text style={styles.buttonText}>Zaloguj się</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonSecondary}
        onPress={() => router.push('/rejestracja')}
      >
        <Text style={styles.buttonTextSecondary}>Zarejestruj się</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF8F0',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
  },
  button: {
    backgroundColor: '#F7C8E0',
    padding: 14,
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonSecondary: {
    backgroundColor: '#AEDFF7',
    padding: 14,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonTextSecondary: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
