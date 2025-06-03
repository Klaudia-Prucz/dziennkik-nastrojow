import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

const WpisyContext = createContext();

export const WpisyProvider = ({ children }) => {
  const [wpisy, setWpisy] = useState([]);

  useEffect(() => {
    odswiezWpisy();
  }, []);

  const odswiezWpisy = useCallback(async () => {
    try {
      const dane = await AsyncStorage.getItem('wpisy');
      if (dane) {
        setWpisy(JSON.parse(dane));
      }
    } catch (err) {
      console.error('Błąd przy odświeżaniu wpisów:', err);
    }
  }, []);

  const zapiszWpis = async (nowy) => {
    try {
      const noweWpisy = [nowy, ...wpisy];
      setWpisy(noweWpisy);
      await AsyncStorage.setItem('wpisy', JSON.stringify(noweWpisy));
    } catch (err) {
      console.error('Błąd przy zapisie:', err);
    }
  };

  const usunWpis = async (id) => {
    try {
      const noweWpisy = wpisy.filter((w) => w.id !== id);
      setWpisy(noweWpisy);
      await AsyncStorage.setItem('wpisy', JSON.stringify(noweWpisy));
    } catch (err) {
      console.error('Błąd przy usuwaniu wpisu:', err);
    }
  };

  return (
    <WpisyContext.Provider value={{ wpisy, zapiszWpis, odswiezWpisy, usunWpis }}>
      {children}
    </WpisyContext.Provider>
  );
};

export const useWpisy = () => useContext(WpisyContext);
