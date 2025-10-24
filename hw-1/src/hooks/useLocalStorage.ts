import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Получаем значение из localStorage или используем начальное
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Ошибка чтения из localStorage (${key}):`, error);
      return initialValue;
    }
  });

  // Сохраняем в localStorage при изменении значения
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Ошибка записи в localStorage (${key}):`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}
