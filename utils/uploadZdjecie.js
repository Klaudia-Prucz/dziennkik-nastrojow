import * as FileSystem from 'expo-file-system';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { storage } from '../firebaseConfig';

export const uploadZdjecie = async (uri) => {
  const base64 = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  const nazwaPliku = `zdjecia/${uuidv4()}.jpg`;
  const storageRef = ref(storage, nazwaPliku);

  await uploadString(storageRef, base64, 'base64');
  return await getDownloadURL(storageRef);
};
