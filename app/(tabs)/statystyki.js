import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { supabase } from '../../supabaseClient';

export default function Statystyki() {
  const [wpisy, setWpisy] = useState([]);
  const [podsumowanie, setPodsumowanie] = useState({
    dobrze: 0,
    srednio: 0,
    zle: 0,
  });
  const [dominanta, setDominanta] = useState('');
  const [sugestiaTekst, setSugestiaTekst] = useState('');

  useEffect(() => {
    const pobierzWpisy = async () => {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) return;

      const { data, error } = await supabase
        .from('entries')
        .select('*')
        .eq('user_id', user.id);

      if (!error) setWpisy(data);
    };

    pobierzWpisy();
  }, []);

  useEffect(() => {
    const liczniki = { dobrze: 0, srednio: 0, zle: 0 };

    wpisy.forEach((wpis) => {
      if (wpis.summary === 'Dobrze') liczniki.dobrze++;
      else if (wpis.summary === 'Tak sobie') liczniki.srednio++;
      else if (wpis.summary === 'Źle') liczniki.zle++;
    });

    const max = Math.max(liczniki.dobrze, liczniki.srednio, liczniki.zle);

    let nowaDominanta = '';
    let nowaSugestia = '';

    if (max === 0) {
      nowaDominanta = 'Brak danych';
      nowaSugestia = 'Dodaj wpis, aby otrzymać sugestię 😊';
    } else if (max === liczniki.dobrze) {
      nowaDominanta = 'Zadowolona 😊';
      nowaSugestia = 'Świetnie Ci idzie! Pielęgnuj to, co Cię uszczęśliwia 🌟';
    } else if (max === liczniki.srednio) {
      nowaDominanta = 'Obojętna 😐';
      nowaSugestia = 'Spróbuj znaleźć coś drobnego, co wniesie radość do Twojego dnia 🌤️';
    } else {
      nowaDominanta = 'Niekoniecznie szczęśliwa 😞';
      nowaSugestia = 'Może czas na rozmowę z kimś bliskim lub spacer? 🌱';
    }

    setPodsumowanie((prev) => {
      if (
        prev.dobrze !== liczniki.dobrze ||
        prev.srednio !== liczniki.srednio ||
        prev.zle !== liczniki.zle
      ) {
        return liczniki;
      }
      return prev;
    });

    setDominanta((prev) => (prev !== nowaDominanta ? nowaDominanta : prev));
    setSugestiaTekst((prev) => (prev !== nowaSugestia ? nowaSugestia : prev));
  }, [wpisy]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.dominantaNaglowek}>Ogólnie jesteś:</Text>
      <Text style={styles.dominanta}>{dominanta}</Text>

      <View style={styles.statystykiBox}>
        <Text style={styles.stat}>Dobrze: {podsumowanie.dobrze}</Text>
        <Text style={styles.stat}>Tak sobie: {podsumowanie.srednio}</Text>
        <Text style={styles.stat}>Źle: {podsumowanie.zle}</Text>
      </View>

      <View style={styles.poradaBox}>
        <Text style={styles.poradaNaglowek}>Sugestia dla Ciebie:</Text>
        <Text style={styles.porada}>{sugestiaTekst}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF8F0',
    padding: 24,
    flexGrow: 1,
  },
  dominantaNaglowek: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  dominanta: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#E76617',
    marginBottom: 20,
  },
  statystykiBox: {
    backgroundColor: '#fdebd3',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  stat: {
    fontSize: 18,
    marginBottom: 8,
    color: '#555',
  },
  poradaBox: {
    backgroundColor: '#e0f7fa',
    borderRadius: 12,
    padding: 16,
  },
  poradaNaglowek: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#333',
  },
  porada: {
    fontSize: 16,
    color: '#333',
  },
});
