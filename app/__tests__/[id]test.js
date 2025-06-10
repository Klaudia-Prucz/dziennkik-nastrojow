import { fireEvent, render } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SzczegolyWpisu from '../../app/wpis/[id]';
import { WpisyContext } from '../../konteksty/WpisyContext';

const wpisMock = {
  id: '1',
  date: new Date().toISOString(),
  mood: 'Zadowolona',
  note: 'Byłam na spacerze',
  plan: 'Zrobić herbatę',
  summary: 'Dobrze',
  image_url: null,
};

const mockRouter = { back: jest.fn() };

jest.mock('expo-router', () => ({
  useRouter: () => mockRouter,
  useLocalSearchParams: () => ({ id: '1' }),
}));

describe('SzczegolyWpisu', () => {
  it('reaguje na przycisk powrotu', () => {
    const { getByText } = render(
      <SafeAreaProvider>
        <WpisyContext.Provider value={{ wpisy: [wpisMock] }}>
          <SzczegolyWpisu />
        </WpisyContext.Provider>
      </SafeAreaProvider>
    );

    fireEvent.press(getByText('Powrót'));
    expect(mockRouter.back).toHaveBeenCalled();
  });
});
