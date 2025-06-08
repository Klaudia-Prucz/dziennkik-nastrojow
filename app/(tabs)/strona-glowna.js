import * as Location from 'expo-location';
import { useFocusEffect, useRouter } from 'expo-router';
import { supabase } from '../../supabaseClient';
import React, { useCallback, useMemo, useState } from 'react';
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

export default function StronaGlowna() {
  const router = useRouter();
  const [wpisy, setWpisy] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [pogoda, setPogoda] = useState(null);

  const API_KEY = '66ba41065d9f6b98d101b71a13a0ca4d';

  const pobierzWpisy = async () => {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (!user || userError) return;

    const { data, error } = await supabase
      .from('entries')
      .select('*')
      .eq('user_id', user.id)
      .order('date', { ascending: false });

    if (!error) setWpisy(data || []);
    else console.error('Błąd pobierania wpisów:', error.message);
  };

  useFocusEffect(
    useCallback(() => {
      pobierzWpisy();
      pobierzPogode().then(setPogoda);
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await pobierzWpisy();
    setRefreshing(false);
  };

  const pobierzPogode = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.warn('Brak zgody na lokalizację');
        return null;
      }
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=pl&appid=${API_KEY}`
      );
      const data = await response.json();
      if (!data || !data.main || !data.weather || data.cod !== 200) {
        console.warn('Niepoprawne dane z API pogody', data);
        return null;
      }
      return {
        temperatura: data.main.temp,
        opis: data.weather[0].description,
        lokalizacja: data.name,
      };
    } catch (error) {
      console.error('Błąd pobierania pogody:', error);
      return null;
    }
  };

  const wyloguj = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/logowanie');
    } catch (error) {
      console.error('Błąd przy wylogowywaniu:', error);
    }
  };

  const dzisiaj = new Date().toDateString();

  const dzisiejszyWpis = useMemo(() => {
    return wpisy.find((w) => new Date(w.date).toDateString() === dzisiaj);
  }, [wpisy]);

  const starszeWpisy = useMemo(() => {
    return wpisy.filter((w) => new Date(w.date).toDateString() !== dzisiaj);
  }, [wpisy]);

  return (
    <View style={styles.container}>
      <FlatList
        data={starszeWpisy}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={
          <View>
            <View style={styles.headerRow}>
              <Text style={styles.powitanie}>Cześć!</Text>
              <TouchableOpacity onPress={wyloguj}>
                <Text style={styles.wylogujText}>Wyloguj</Text>
              </TouchableOpacity>
            </View>

            {pogoda && (
              <View style={styles.pogodaBox}>
                <Text style={styles.pogodaText}>
                  🌤️ Pogoda: {pogoda.temperatura}°C, {pogoda.opis} ({pogoda.lokalizacja})
                </Text>
              </View>
            )}

            {dzisiejszyWpis ? (
              <View style={styles.kartaDniaBox}>
                <Text style={styles.kartaDniaTytul}>Najnowszy wpis:</Text>
                <Text style={styles.kartaDniaTekst}>
                  {dzisiejszyWpis.mood}
                </Text>
                {dzisiejszyWpis.image_url && (
                  <Image
                    source={{ uri: dzisiejszyWpis.image_url }}
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

            <Text style={styles.naglowek}>Poprzednie wpisy</Text>

            {starszeWpisy.length === 0 && (
              <Text style={styles.brak}>Brak wcześniejszych wpisów.</Text>
            )}
          </View>
        }
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(`/wpis/${item.id}`)}
            style={styles.wpis}
          >
            <View style={styles.wpisTop}>
              <Text style={styles.data}>
                {new Date(item.date).toLocaleDateString('pl-PL', {
                  weekday: 'short',
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                })}
              </Text>
              <Text
                style={[
                  styles.statusBadge,
                  item.summary === 'Dobrze'
                    ? styles.dobrze
                    : item.summary === 'Źle'
                    ? styles.zle
                    : styles.srednio,
                ]}
              >
                {item.summary}
              </Text>
            </View>

            <Text style={styles.nastrojTekst}>Nastrój: {item.mood}</Text>

            {item.image_url && (
              <Image
                source={{ uri: item.image_url }}
                style={styles.wpisMiniatura}
                resizeMode="cover"
              />
            )}
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
  wpisTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    fontWeight: 'bold',
    fontSize: 12,
    color: '#fff',
    overflow: 'hidden',
  },
  dobrze: {
    backgroundColor: 'green',
  },
  zle: {
    backgroundColor: 'red',
  },
  srednio: {
    backgroundColor: 'orange',
  },
  data: {
    fontWeight: 'bold',
    color: '#a0522d',
  },
  nastrojTekst: {
    fontSize: 14,
    color: '#333',
    marginBottom: 6,
  },
  wpisMiniatura: {
    width: '100%',
    height: 160,
    borderRadius: 8,
    marginTop: 6,
  },
  pogodaBox: {
    backgroundColor: '#E0F7FA',
    padding: 10,
    borderRadius: 10,
    marginBottom: 16,
  },
  pogodaText: {
    fontSize: 16,
    color: '#333',
  },
});
