import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useWpisy } from '../../konteksty/WpisyContext';

export default function StronaGlowna() {
  const { wpisy } = useWpisy();

  return (
    <View style={styles.container}>
      <Text style={styles.tytul}>Dziennik Nastrojów</Text>
      {wpisy.length === 0 ? (
        <Text style={styles.brak}>Brak wpisów 😢</Text>
      ) : (
        <FlatList
          data={wpisy}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.wpis}>
              <Text style={styles.emoji}>{item.nastrój}</Text>
              <Text>{new Date(item.data).toLocaleString()}</Text>
              {item.notatka ? <Text>{item.notatka}</Text> : null}
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  tytul: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  brak: { textAlign: 'center', color: '#888' },
  wpis: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  emoji: { fontSize: 28 },
});
