import { Stack } from 'expo-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import '../firebaseConfig';
import { WpisyProvider } from '../konteksty/WpisyContext';

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // null = ładowanie

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });

    return unsubscribe;
  }, []);

  if (isLoggedIn === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#E76617" />
      </View>
    );
  }

  return (
    <WpisyProvider>
      <Stack screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
          <>
            <Stack.Screen name="logowanie" />
            <Stack.Screen name="rejestracja" />
            <Stack.Screen name="index" />
          </>
        ) : (
          <Stack.Screen name="(tabs)" />
        )}
      </Stack>
    </WpisyProvider>
  );
}
