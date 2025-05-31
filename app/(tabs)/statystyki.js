import { StyleSheet, Text, View } from 'react-native';
import { useWpisy } from '../../konteksty/WpisyContext';

export default function Statystyki() {
  const { wpisy } = useWpisy();

  const pozytywne = wpisy.filter((w) => w.nastrój.includes('😊')).length;
  const neutralne = wpisy.filter((w) => w.nastrój.includes('😐')).length;
  const negatywne = wpisy.filter((w) => w.nastrój.includes('😢') || w.nastrój.includes('😡')).length;

  return (
    <View style={styles.container}>
      <Text style={styles.tytul}>Statystyki</Text>
      <Text>😊 Pozytywne: {pozytywne}</Text>
      <Text>😐 Neutralne: {neutralne}</Text>
      <Text>😢/😡 Negatywne: {negatywne}</Text>
      <Text>📋 Wszystkich wpisów: {wpisy.length}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  tytul: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
});
