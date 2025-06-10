import { render } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import StronaGlowna from '../../app/(tabs)/strona-glowna';
import { WpisyProvider } from '../../konteksty/WpisyContext';

jest.mock('expo-router', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

jest.mock('expo-location', () => ({
  requestForegroundPermissionsAsync: jest.fn().mockResolvedValue({ status: 'granted' }),
  getCurrentPositionAsync: jest.fn().mockResolvedValue({
    coords: { latitude: 52.2297, longitude: 21.0122 },
  }),
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        main: { temp: 20 },
        weather: [{ description: 'słonecznie' }],
        name: 'Warszawa',
        cod: 200,
      }),
  })
);

describe('StronaGlowna', () => {
  it('renderuje ekran bez crasha', () => {
    render(
      <SafeAreaProvider>
        <WpisyProvider>
          <StronaGlowna />
        </WpisyProvider>
      </SafeAreaProvider>
    );
  });
});
