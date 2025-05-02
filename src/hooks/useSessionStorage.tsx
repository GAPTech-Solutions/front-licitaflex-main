import { useState } from "react";

export default function useSessionStorage<T = any>(
  keyName: string,
  defaultValue: T | null = null
): [T | null, (newValue: T | null) => void] {
  const [storedValue, setStoredValue] = useState<T | null>(() => {
    try {
      const value = window.sessionStorage.getItem(keyName);
      if (value) {
        return JSON.parse(value);
      }
      if (defaultValue) {
        window.sessionStorage.setItem(keyName, JSON.stringify(defaultValue));
      }
      return defaultValue;
    } catch (err) {
      return defaultValue;
    }
  });
  const setValue = (newValue: T | null) => {
    try {
      if (newValue == null) {
        window.sessionStorage.removeItem(keyName);
        return;
      }
      window.sessionStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {
    } finally {
      setStoredValue(newValue);
    }
  };
  return [storedValue, setValue];
}
