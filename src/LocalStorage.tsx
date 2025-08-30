import { useState } from "react";

export function useLocalStorage<T>(key: string, startValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [value, setValue] = useState(() => {
    const data = localStorage.getItem(key);

    if (data === null) {
      return startValue;
    }

    try {
      return JSON.parse(data);
    } catch (e) {
      localStorage.removeItem(key);
      return startValue;
    }
  });

  const save = (newValue: T | ((prev: T) => T)) => {
    let valueToStore: T;

    if (typeof newValue === 'function') {
      valueToStore = (newValue as (prev: T) => T)(value);
    } else {
      valueToStore = newValue;
    }

    localStorage.setItem(key, JSON.stringify(valueToStore));
    setValue(valueToStore);
  }

  return [value, save];
}