import { fireEvent, render } from '@testing-library/react-native';
import { WpisyProvider } from '../../../konteksty/WpisyContext';
import DodajWpis from '../dodaj-wpis';

jest.mock('expo-router', () => ({
  useRouter: () => ({ back: jest.fn(), push: jest.fn() }),
}));

describe('DodajWpis', () => {
  it('renderuje formularz i pozwala wpisać dane', () => {
    const { getByPlaceholderText, getByText } = render(
      <WpisyProvider>
        <DodajWpis />
      </WpisyProvider>
    );

    const opisInput = getByPlaceholderText('Opisz swój dzień...');
    const nastrojInput = getByPlaceholderText('Jak się czujesz?');

    fireEvent.changeText(opisInput, 'Było super');
    fireEvent.changeText(nastrojInput, 'Szczęśliwa');

    expect(opisInput.props.value).toBe('Było super');
    expect(nastrojInput.props.value).toBe('Szczęśliwa');

    const zapiszButton = getByText('Zapisz');
    expect(zapiszButton).toBeTruthy();
  });
});
