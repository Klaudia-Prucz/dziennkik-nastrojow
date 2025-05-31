import { Stack } from 'expo-router';
import { WpisyProvider } from '../konteksty/WpisyContext';

export default function RootLayout() {
  return (
    <WpisyProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </WpisyProvider>
  );
}
