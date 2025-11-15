import { useState, useCallback, useEffect } from 'react';

export const useErrorNotification = () => {
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const showError = useCallback((message: string) => {
    setError(message);
    setIsVisible(true);
  }, []);

  const hideError = useCallback(() => {
    setIsVisible(false);
  }, []);

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [isVisible]);

  return { error, isVisible, showError, hideError };
};
