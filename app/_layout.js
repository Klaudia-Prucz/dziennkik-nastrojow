import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { supabase } from '../supabaseClient';
import { WpisyProvider } from '../konteksty/WpisyContext';

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // null = ładowanie

  useEffect(() => {
    // Sprawdzenie aktualnej sesji
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session?.user);
    };

    // Listener zmian w sesji
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session?.user);
    });

    checkSession();

    return () => {
      listener?.subscription.unsubscribe();
    };
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
