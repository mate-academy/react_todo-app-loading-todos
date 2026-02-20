import { ErrorType } from '../types/Error';

export function handleError(
  callback: (value: ErrorType | null) => void,
  errorType: ErrorType,
) {
  callback(errorType);

  return setTimeout(() => {
    callback(null);
  }, 3000);
}
