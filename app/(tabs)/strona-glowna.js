import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
  Button,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useWpisy } from '../../konteksty/WpisyContext';

export default function StronaGlowna() {
  const router = useRouter();
  const { wpisy, odswiezWpisy } = useWpisy();
  const [refreshing, setRefreshing] = useState(false);

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

  return (
    <View style={styles.container}>
      <Text style={styles.powitanie}>Cześć Klaudia, jak się dziś czujesz?</Text>

      <View style={styles.dodajWpisBtn}>
        <Button
          title="Dodaj wpis"
          onPress={() => router.push('/(tabs)/dodaj-wpis')}
          color="#F7A072"
        />
      </View>

      <Text style={styles.naglowek}>Twój dziennik nastrojów</Text>

      {wpisy.length === 0 ? (
        <Text style={styles.brak}>Brak wpisów. Dodaj pierwszy!</Text>
      ) : (
        <FlatList
          data={wpisy}
          keyExtractor={(_, index) => index.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item, index }) => (
            <Pressable
              onPress={() => router.push(`/(tabs)/wpis/${index}`)}
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
              <Text style={styles.kategoria}>Kategoria: {item.podsumowanie}</Text>
            </Pressable>
          )}
        />
      )}

      <View style={styles.wylogujBtn}>
        <Button title="Wyloguj się" onPress={wyloguj} color="#a33" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F0',
    padding: 16,
  },
  powitanie: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3F3F3F',
    marginBottom: 16,
  },
  dodajWpisBtn: {
    marginBottom: 20,
    alignSelf: 'flex-start',
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
    marginBottom: 14,
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
    color: '#777',
    marginTop: 4,
    fontStyle: 'italic',
  },
  wylogujBtn: {
    marginTop: 20,
    alignSelf: 'flex-start',
  },
});
