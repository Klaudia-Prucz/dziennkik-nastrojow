// firebase/firebaseConfig.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import {
    getReactNativePersistence,
    initializeAuth,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import 'react-native-get-random-values';

const firebaseConfig = {
  apiKey: 'AIzaSyD7-KUmlvSm0xtvdKzPxQRJmE86H7nc_jg',
  authDomain: 'dziennik-nastrojow.firebaseapp.com',
  projectId: 'dziennik-nastrojow',
  storageBucket: 'dziennik-nastrojow.appspot.com',
  messagingSenderId: '1088219569467',
  appId: '1:1088219569467:web:813a9ca0d48536e6102b1e',
};

// Inicjalizacja aplikacji
const app = initializeApp(firebaseConfig);

// ✅ Poprawna inicjalizacja autoryzacji z AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Firestore i Storage
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };

