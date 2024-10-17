import { ErrorMessages } from '../types/ErrorTypes';
import { Dispatch, SetStateAction } from 'react';

export const handleError = (
  setErrorMessage: Dispatch<SetStateAction<ErrorMessages>>,
  errorType: ErrorMessages,
) => {
  setErrorMessage(errorType);
  setTimeout(() => setErrorMessage(ErrorMessages.NONE), 3000);
};
