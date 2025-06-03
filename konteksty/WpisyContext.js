// konteksty/WpisyContext.js
import { getAuth } from 'firebase/auth';
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  where
} from 'firebase/firestore';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { db } from '../firebaseConfig';

const WpisyContext = createContext();

export const WpisyProvider = ({ children }) => {
  const [wpisy, setWpisy] = useState([]);

  const odswiezWpisy = useCallback(async () => {
    const user = getAuth().currentUser;
    if (!user) return;

    try {
      const q = query(
        collection(db, 'wpisy'),
        where('uid', '==', user.uid),
        orderBy('data', 'desc')
      );

      const snapshot = await getDocs(q);
      const dane = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setWpisy(dane);
    } catch (err) {
      console.error('Błąd przy odświeżaniu wpisów:', err);
    }
  }, []);

  const zapiszWpis = async (nowy) => {
    const user = getAuth().currentUser;
    if (!user) return;

    try {
      await addDoc(collection(db, 'wpisy'), {
        ...nowy,
        uid: user.uid,
        data: new Date().toISOString(),
      });
      odswiezWpisy();
    } catch (err) {
      console.error('Błąd przy zapisie wpisu:', err);
    }
  };

  useEffect(() => {
    odswiezWpisy();
  }, [odswiezWpisy]);

  return (
    <WpisyContext.Provider value={{ wpisy, zapiszWpis, odswiezWpisy }}>
      {children}
    </WpisyContext.Provider>
  );
};

export const useWpisy = () => useContext(WpisyContext);
