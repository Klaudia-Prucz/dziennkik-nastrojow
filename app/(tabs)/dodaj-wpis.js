import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Button,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useWpisy } from '../../konteksty/WpisyContext';

const PODSUMOWANIE_NASTROJU = ['Dobrze', 'Tak sobie', 'Źle'];

export default function DodajWpis() {
  const [nastroj, setNastroj] = useState('');
  const [notatka, setNotatka] = useState('');
  const [plan, setPlan] = useState('');
  const [podsumowanie, setPodsumowanie] = useState('');
  const [zdjecie, setZdjecie] = useState(null);

  const { zapiszWpis } = useWpisy();
  const router = useRouter();

  const wybierzZdjecie = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Brak uprawnień', 'Musisz zezwolić na dostęp do galerii');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });
    if (!result.canceled) {
      setZdjecie(result.assets[0].uri);
    }
  };

  const zrobZdjecie = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Brak uprawnień', 'Musisz zezwolić na użycie aparatu');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      quality: 0.7,
    });
    if (!result.canceled) {
      setZdjecie(result.assets[0].uri);
    }
  };

  const zapisz = async () => {
    if (!nastroj.trim()) {
      Alert.alert('Uwaga', 'Wpisz jak się czujesz');
      return;
    }

    const wpis = {
      nastroj,
      notatka,
      plan,
      podsumowanie,
      data: new Date().toISOString(),
      zdjecie,
    };

    await zapiszWpis(wpis);

    Alert.alert('Zapisano', 'Twój wpis został dodany');
    setNastroj('');
    setNotatka('');
    setPlan('');
    setPodsumowanie('');
    setZdjecie(null);
    router.replace('/(tabs)/strona-glowna');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Jak się czujesz?</Text>
      <TextInput
        style={styles.input}
        placeholder="Opisz swoje emocje"
        value={nastroj}
        onChangeText={setNastroj}
        multiline
      />

      <Text style={styles.label}>Co się wydarzyło?</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Notatka – np. co się dziś wydarzyło"
        value={notatka}
        onChangeText={setNotatka}
        multiline
      />

      <Text style={styles.label}>Dodaj zdjęcie</Text>
      <View style={{ flexDirection: 'row', gap: 10, marginBottom: 10 }}>
        <Button title="Z galerii" onPress={wybierzZdjecie} color="#FAD6A5" />
        <Button title="Zrób zdjęcie" onPress={zrobZdjecie} color="#FAD6A5" />
      </View>
      {zdjecie && (
        <Image
          source={{ uri: zdjecie }}
          style={{
            width: '100%',
            height: 200,
            borderRadius: 10,
            marginBottom: 20,
          }}
        />
      )}
      <Text style={styles.label}>Co zamierzasz dalej zrobić?</Text>
      <TextInput
        style={styles.input}
        placeholder="Plan, cel, pomysł na działanie"
        value={plan}
        onChangeText={setPlan}
        multiline
      />

      <Text style={styles.label}>Podsumuj swój dzień</Text>
      <View style={styles.moodButtons}>
        {PODSUMOWANIE_NASTROJU.map((item) => (
          <Pressable
            key={item}
            style={[
              styles.moodButton,
              podsumowanie === item && styles.moodButtonSelected,
            ]}
            onPress={() => setPodsumowanie(item)}
          >
            <Text style={styles.moodButtonText}>{item}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.button}>
        <Button title="Zapisz wpis" onPress={zapisz} color="#F7C8E0" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF8F0',
    padding: 20,
    flexGrow: 1,
  },
  label: {
    fontSize: 18,
    marginBottom: 6,
    color: '#333',
  },
  input: {
    backgroundColor: '#ffffff',
    borderColor: '#AEDFF7',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  moodButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  moodButton: {
    flex: 1,
    backgroundColor: '#E0F7FA',
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
  moodButtonSelected: {
    backgroundColor: '#AEDFF7',
  },
  moodButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
  button: {
    marginTop: 10,
  },
});
