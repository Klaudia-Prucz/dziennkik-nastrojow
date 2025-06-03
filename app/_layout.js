import { Stack } from 'expo-router';
import { WpisyProvider } from '../konteksty/WpisyContext';
import '../firebaseConfig';


export default function RootLayout() {
  return (
    <WpisyProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="logowanie" />
        <Stack.Screen name="rejestracja" />
      </Stack>
    </WpisyProvider>
  );
}
