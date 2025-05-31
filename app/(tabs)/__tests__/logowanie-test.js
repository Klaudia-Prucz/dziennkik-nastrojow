import AsyncStorage from '@react-native-async-storage/async-storage';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import Logowanie from '../logowanie';

let mockReplace;

// 👇 Prawidłowe mockowanie expo-router z dozwoloną zmienną
jest.mock('expo-router', () => {
  mockReplace = jest.fn();
  return {
    useRouter: () => ({
      replace: mockReplace,
    }),
  };
});

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
}));

describe('Ekran logowania', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderuje pola i przycisk logowania', () => {
    const { getByPlaceholderText, getByText } = render(<Logowanie />);

    expect(getByPlaceholderText('Login')).toBeTruthy();
    expect(getByPlaceholderText('Hasło')).toBeTruthy();
    expect(getByText('Zaloguj się')).toBeTruthy();
  });

  it('zapisuje zalogowanie i przekierowuje przy poprawnych danych', async () => {
    const { getByPlaceholderText, getByText } = render(<Logowanie />);

    fireEvent.changeText(getByPlaceholderText('Login'), 'klaudia');
    fireEvent.changeText(getByPlaceholderText('Hasło'), '12345');
    fireEvent.press(getByText('Zaloguj się'));

    await waitFor(() => {
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('zalogowany', 'true');
      expect(mockReplace).toHaveBeenCalledWith('/(tabs)/strona-glowna');
    });
  });

  it('wyświetla alert przy błędnych danych', async () => {
    const alertSpy = jest.spyOn(Alert, 'alert');

    const { getByPlaceholderText, getByText } = render(<Logowanie />);

    fireEvent.changeText(getByPlaceholderText('Login'), 'niepoprawny');
    fireEvent.changeText(getByPlaceholderText('Hasło'), 'zlehaslo');
    fireEvent.press(getByText('Zaloguj się'));

    await waitFor(() => {
      expect(AsyncStorage.setItem).not.toHaveBeenCalled();
      expect(alertSpy).toHaveBeenCalledWith(
        'Błąd logowania',
        'Nieprawidłowy login lub hasło'
      );
    });
  });
});
