// firebase/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyD7-KUmlvSm0xtvdKzPxQRJmE86H7nc_jg',
  authDomain: 'dziennik-nastrojow.firebaseapp.com',
  projectId: 'dziennik-nastrojow',
  storageBucket: 'dziennik-nastrojow.firebasestorage.app',
  messagingSenderId: '1088219569467',
  appId: '1:1088219569467:web:813a9ca0d48536e6102b1e',
};

// Inicjalizacja aplikacji
const app = initializeApp(firebaseConfig);

// Eksport autoryzacji
const auth = getAuth(app);

export { auth };
