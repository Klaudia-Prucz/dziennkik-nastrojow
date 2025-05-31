import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useWpisy } from '../../konteksty/WpisyContext';

export default function SzczegolyWpisu() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { wpisy } = useWpisy();

  const wpis = wpisy[parseInt(id)];

  if (!wpis) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.error}>Nie znaleziono wpisu.</Text>
        <Pressable onPress={() => router.back()} style={styles.powrot}>
          <Ionicons name="arrow-back" size={20} color="#E76617" />
          <Text style={styles.powrotTekst}>Powrót</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable
          onPress={() => router.replace('/(tabs)/strona-glowna')}
          style={styles.powrot}
        >
          <Ionicons name="arrow-back" size={20} color="#E76617" />
          <Text style={styles.powrotTekst}>Powrót</Text>
        </Pressable>

        <Text style={styles.data}>{sformatujDate(wpis.data)}</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Jak się czułaś:</Text>
          <Text style={styles.text}>{wpis.nastroj}</Text>

          <Text style={styles.label}>Co się wydarzyło:</Text>
          <Text style={styles.text}>{wpis.notatka || '—'}</Text>

          <Text style={styles.label}>Co zamierzasz dalej zrobić:</Text>
          <Text style={styles.text}>{wpis.plan || '—'}</Text>

          <Text style={styles.label}>Podsumowanie:</Text>
          <Text style={styles.text}>{wpis.podsumowanie}</Text>

          {wpis.zdjecie && (
            <>
              <Text style={styles.label}>Zdjęcie:</Text>
              <Image source={{ uri: wpis.zdjecie }} style={styles.image} />
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const sformatujDate = (iso) => {
  const d = new Date(iso);
  return d.toLocaleString('pl-PL', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F0',
  },
  content: {
    padding: 20,
  },
  powrot: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  powrotTekst: {
    color: '#E76617',
    fontWeight: 'bold',
    marginLeft: 6,
    fontSize: 16,
  },
  error: {
    fontSize: 18,
    color: '#a00',
    textAlign: 'center',
    marginTop: 40,
  },
  data: {
    fontSize: 16,
    color: '#A36A5F',
    fontWeight: 'bold',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#e0f7fa',
    padding: 20,
    borderRadius: 16,
    borderColor: '#B2EBF2',
    borderWidth: 1,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 14,
    color: '#333',
  },
  text: {
    fontSize: 16,
    color: '#4A4A4A',
    marginTop: 4,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginTop: 12,
  },
});
