import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const sprawdzZalogowanie = async () => {
      const zalogowany = await AsyncStorage.getItem('zalogowany');
      if (zalogowany === 'true') {
        router.replace('/(tabs)/strona-glowna');
      } else {
        router.replace('/logowanie');
      }
    };

    sprawdzZalogowanie();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#E76617" />
    </View>
  );
}
