import AsyncStorage from '@react-native-async-storage/async-storage';
import { Coffee, BrewingMethod, Rating } from './Types';
import { useState, useEffect } from 'react';

export default function useStorage<T>(key: string) {
  const [storage, setStorage] = useState<T>(null);

  useEffect(() => {
    AsyncStorage.getItem(key).then((jsonValue) => {
      let value: T = jsonValue != null ? JSON.parse(jsonValue) : null;
      setStorage(value || []);
      console.log('Initial storage load for ' + key);
    });
  }, []);

  useEffect(() => {
    const jsonValue = JSON.stringify(storage);
    AsyncStorage.setItem(key, jsonValue);
  }, [storage]);
  console.log('Storage changed for ' + key);

  return [storage, setStorage];
}
