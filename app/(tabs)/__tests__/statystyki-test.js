import { render } from '@testing-library/react-native';
import { WpisyProvider } from '../../../konteksty/WpisyContext';
import Statystyki from '../statystyki';

describe('Statystyki', () => {
  it('renderuje nagłówek i podstawowe informacje', () => {
    const { getByText } = render(
      <WpisyProvider>
        <Statystyki />
      </WpisyProvider>
    );

    expect(getByText(/statystyki/i)).toBeTruthy();

 
    expect(getByText(/liczba wpisów/i)).toBeTruthy();


    expect(getByText(/szczęśliwy/i)).toBeTruthy();
    expect(getByText(/smutny/i)).toBeTruthy();
  });
});
