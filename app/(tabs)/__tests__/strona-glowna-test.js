import { render } from '@testing-library/react-native';
import { WpisyProvider } from '../../../konteksty/WpisyContext';
import StronaGlowna from '../strona-glowna';

jest.mock('expo-router', () => ({
  useRouter: () => ({ push: jest.fn(), replace: jest.fn() }),
}));

describe('StronaGlowna', () => {
  it('renderuje powitanie i przycisk dodawania wpisu', () => {
    const { getByText } = render(
      <WpisyProvider>
        <StronaGlowna />
      </WpisyProvider>
    );

    expect(getByText(/Cześć Klaudia/i)).toBeTruthy();
    expect(getByText(/Dodaj wpis/i)).toBeTruthy();
  });
});
