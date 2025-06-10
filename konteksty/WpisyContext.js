import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const WpisyContext = createContext();

export const WpisyProvider = ({ children }) => {
  const [wpisy, setWpisy] = useState([]);
  const [user, setUser] = useState(null);

  const odswiezWpisy = useCallback(async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('entries')
      .select('*')
      .eq('user_id', user.id)
      .order('date', { ascending: false });

    if (error) {
      console.error('Błąd przy pobieraniu wpisów:', error.message);
      return;
    }

    setWpisy(data || []);
  }, [user]);

  const zapiszWpis = async (nowy) => {
    if (!user) {
      console.warn('Nie można zapisać – brak zalogowanego użytkownika.');
      return;
    }

    const wpis = {
      ...nowy,
      user_id: user.id,
      date: new Date().toISOString(),
    };

    const { error } = await supabase.from('entries').insert(wpis);
    if (error) {
      console.error('Błąd przy zapisie wpisu:', error.message);
      return;
    }

    await odswiezWpisy();
  };

  useEffect(() => {
    const sprawdzSesje = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    sprawdzSesje();

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user) {
      odswiezWpisy();
    } else {
      setWpisy([]); // wyczyść wpisy po wylogowaniu
    }
  }, [user, odswiezWpisy]);

  return (
    <WpisyContext.Provider value={{ wpisy, zapiszWpis, odswiezWpisy }}>
      {children}
    </WpisyContext.Provider>
  );
};

export const useWpisy = () => useContext(WpisyContext);
