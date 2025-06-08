// utils/storage.js
import { supabase } from '../supabaseClient';
import * as FileSystem from 'expo-file-system';
import { decode } from 'base64-arraybuffer';

export const uploadZdjecieDoSupabase = async (uri, userId) => {
  try {
    console.log('📤 Start uploadu zdjęcia z URI:', uri);

    const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
    const fileData = decode(base64);

    const fileName = `zdjecia/${userId}_${Date.now()}.jpg`;

    const { data, error } = await supabase
      .storage
      .from('zdjecia')
      .upload(fileName, fileData, {
        contentType: 'image/jpeg',
      });

    if (error) {
      console.error('❌ Błąd uploadu:', error.message);
      return null;
    }

    const { data: publicData } = supabase.storage
      .from('zdjecia')
      .getPublicUrl(fileName);

    return publicData.publicUrl;
  } catch (err) {
    console.error('❌ Błąd przetwarzania zdjęcia:', err.message);
    return null;
  }
};
