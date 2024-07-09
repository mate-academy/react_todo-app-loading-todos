import { useEffect, useState } from 'react';

export const useError = () => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      const timeoutId = setTimeout(() => {
        setError(null);

        clearTimeout(timeoutId);
      }, 3000);
    }
  }, [error]);

  const onError = (message: string) => {
    setError(message);
  };

  const clearError = () => {
    setError(null);
  };

  return {
    error,
    onError,
    clearError,
  };
};
