import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { storage } from '../firebaseConfig';

export const uploadZdjecie = async (uri) => {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();

    const nazwaPliku = `zdjecia/${uuidv4()}.jpg`;
    const storageRef = ref(storage, nazwaPliku);

    await uploadBytes(storageRef, blob);

    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    console.error('Błąd przy wysyłaniu zdjęcia:', error.code, error.message, error);
    throw error;
  }
};
