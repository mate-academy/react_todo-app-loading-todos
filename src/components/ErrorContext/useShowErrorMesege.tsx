import { useCallback } from 'react';
import { useAppErrorContex } from './ErrorContext';

export const useShowErrorMesege = () => {
  const { showError } = useAppErrorContex();

  return useCallback(
    (action: string, error: Error) => showError(
      `An unexpected erroe occurred while ${action}. This is what our server said: ${error.message} (it fot treaning)`,
    ),
    [showError],
  );
};
