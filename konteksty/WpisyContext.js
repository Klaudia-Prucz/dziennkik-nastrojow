import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';

const WpisyContext = createContext();

export const WpisyProvider = ({ children }) => {
  const [wpisy, setWpisy] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('wpisy').then((dane) => {
      if (dane) setWpisy(JSON.parse(dane));
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('wpisy', JSON.stringify(wpisy));
  }, [wpisy]);

  const dodajWpis = (nowy) => {
    setWpisy((poprz) => [nowy, ...poprz]);
  };

  return (
    <WpisyContext.Provider value={{ wpisy, dodajWpis }}>
      {children}
    </WpisyContext.Provider>
  );
};

export const useWpisy = () => useContext(WpisyContext);
