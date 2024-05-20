import { useState, useCallback, useRef, useEffect } from 'react';
import { Errors } from '../types/Errors';

type SetErrors = React.Dispatch<React.SetStateAction<Errors>>;

export const useErrors = (
  initialErrors: Errors,
): [Errors, (errorKey: keyof Errors) => void, SetErrors] => {
  const [errors, setErrors] = useState<Errors>(initialErrors);
  const timeoutsRef = useRef<{ [key: string]: NodeJS.Timeout | null }>({});

  const triggerError = useCallback((errorKey: keyof Errors) => {
    if (timeoutsRef.current[errorKey]) {
      clearTimeout(timeoutsRef.current[errorKey] as NodeJS.Timeout);
    }

    setErrors(prevErrors => ({
      ...prevErrors,
      [errorKey]: true,
    }));

    timeoutsRef.current[errorKey] = setTimeout(() => {
      setErrors(prevErrors => ({
        ...prevErrors,
        [errorKey]: false,
      }));
      timeoutsRef.current[errorKey] = null;
    }, 3000);
  }, []);

  useEffect(() => {
    const currentTimeouts = timeoutsRef.current;

    return () => {
      Object.values(currentTimeouts).forEach(timeout => {
        if (timeout) {
          clearTimeout(timeout);
        }
      });
    };
  }, []);

  return [errors, triggerError, setErrors];
};
