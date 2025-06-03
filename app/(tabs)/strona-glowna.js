import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useWpisy } from '../../konteksty/WpisyContext';

export default function StronaGlowna() {
  const router = useRouter();
  const { wpisy, odswiezWpisy } = useWpisy();
  const [refreshing, setRefreshing] = useState(false);
  const [imie, setImie] = useState('');

  useEffect(() => {
    const pobierzImie = async () => {
      const uzytkownik = await AsyncStorage.getItem('uzytkownik');
      setImie(uzytkownik || 'Użytkowniku');
    };
    pobierzImie();
  }, []);

  useFocusEffect(
    useCallback(() => {
      odswiezWpisy?.();
    }, [odswiezWpisy])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await odswiezWpisy?.();
    setRefreshing(false);
  };

  const wyloguj = async () => {
    await AsyncStorage.removeItem('zalogowany');
    router.replace('/logowanie');
  };

  const dzisiejszyWpis = useMemo(() => {
    const dzis = new Date().toDateString();
    return wpisy.find((w) => new Date(w.data).toDateString() === dzis);
  }, [wpisy]);

  return (
    <View style={styles.container}>
      <FlatList
        data={wpisy}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={
          <View>
            <View style={styles.headerRow}>
              <Text style={styles.powitanie}>Cześć {imie}</Text>
              <TouchableOpacity onPress={wyloguj}>
                <Text style={styles.wylogujText}>Wyloguj</Text>
              </TouchableOpacity>
            </View>

            {dzisiejszyWpis ? (
              <View style={styles.kartaDniaBox}>
                <Text style={styles.kartaDniaTytul}>Najnowszy wpis:</Text>
                <Text style={styles.kartaDniaTekst}>
                  {dzisiejszyWpis.nastroj}
                </Text>
                {dzisiejszyWpis.zdjecie && (
                  <Image
                    source={{ uri: dzisiejszyWpis.zdjecie }}
                    style={{
                      width: '100%',
                      height: 200,
                      borderRadius: 10,
                      marginTop: 10,
                    }}
                    resizeMode="cover"
                  />
                )}
              </View>
            ) : (
              <TouchableOpacity
                style={styles.dodajKafel}
                onPress={() => router.push('/(tabs)/dodaj-wpis')}
              >
                <Text style={styles.dodajKafelTekst}>Dodaj nowy wpis</Text>
              </TouchableOpacity>
            )}

            <Text style={styles.naglowek}>Twój dziennik nastrojów</Text>

            {wpisy.length === 0 && (
              <Text style={styles.brak}>Brak wpisów. Dodaj pierwszy!</Text>
            )}
          </View>
        }
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => router.push(`/wpis/${item.id}`)}
            style={styles.wpis}
          >
            <Text style={styles.data}>
              {new Date(item.data).toLocaleString('pl-PL', {
                weekday: 'long',
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
            <Text style={styles.opis}>Jak się czułaś: {item.nastroj}</Text>
            <Text
              style={[
                styles.kategoria,
                {
                  color:
                    item.podsumowanie === 'Dobrze'
                      ? 'green'
                      : item.podsumowanie === 'Źle'
                        ? 'red'
                        : 'orange',
                },
              ]}
            >
              Kategoria: {item.podsumowanie}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F0',
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  powitanie: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3F3F3F',
  },
  wylogujText: {
    color: '#a33',
    fontWeight: 'bold',
  },
  dodajKafel: {
    backgroundColor: '#F7A072',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  dodajKafelTekst: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  kartaDniaBox: {
    backgroundColor: '#fdebd3',
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
  },
  kartaDniaTytul: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  kartaDniaTekst: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  naglowek: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  brak: {
    fontSize: 16,
    color: '#888',
  },
  wpis: {
    backgroundColor: '#e0f7fa',
    padding: 14,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  data: {
    fontWeight: 'bold',
    color: '#a0522d',
    marginBottom: 4,
  },
  opis: {
    color: '#444',
  },
  kategoria: {
    marginTop: 4,
    fontStyle: 'italic',
  },
});
