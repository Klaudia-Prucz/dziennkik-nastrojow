import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useWpisy } from '../../konteksty/WpisyContext';

export default function DodajWpis() {
  const { dodajWpis } = useWpisy();
  const [nastrój, setNastrój] = useState('');
  const [notatka, setNotatka] = useState('');

  const zapisz = () => {
    if (!nastrój.trim()) {
      Alert.alert('Uzupełnij nastrój!');
      return;
    }

    const wpis = {
      id: Date.now(),
      data: new Date().toISOString(),
      nastrój,
      notatka,
    };

    dodajWpis(wpis);
    router.push('/strona-glowna');
  };

  return (
    <View style={style.container}>
      <Text style={style.label}>Jak się czujesz? (emoji)</Text>
      <TextInput
        style={style.input}
        value={nastrój}
        onChangeText={setNastrój}
        placeholder="😊 😐 😢"
      />

      <Text style={style.label}>Notatka (opcjonalnie):</Text>
      <TextInput
        style={[style.input, { height: 80 }]}
        value={notatka}
        onChangeText={setNotatka}
        placeholder="Co się działo?"
        multiline
      />

      <Button title="Zapisz wpis" onPress={zapisz} />
    </View>
  );
}

const style = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
});
