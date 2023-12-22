import {
  useContext,
  createContext,
  FC,
  useMemo,
  ReactNode,
  useState,
  useCallback,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AppError } from '../../types/Errors';

interface ErrorContextType {
  showError: (errorMessage: string) => void;
  closeError: (id: string) => void;
  errors: AppError[];
}

const ErrorContext = createContext<ErrorContextType>({
  showError: () => { },
  closeError: () => { },
  errors: [],
});

export const useAppErrorContex = () => useContext(ErrorContext);

interface Props {
  children: ReactNode;
}

const MS_TO_HIDE_ERROR = 3000;

export const ErrorContextProvider: FC<Props> = ({ children }) => {
  const [errors, setErrors] = useState<AppError[]>([]);

  const closeError = useCallback(
    (id: string): void => {
      setErrors((prevErrors) => prevErrors.map((error) => {
        if (error.id === id) {
          return {
            ...error,
            hidden: true,
          };
        }

        return error;
      }));
    }, [],
  );

  const showError = useCallback((errorMessage: string) => {
    const id = uuidv4();

    const error: AppError = {
      id,
      messege: errorMessage,
      hidden: false,
    };

    setErrors((prevError) => [error, ...prevError]);

    setTimeout(() => closeError(id),
      MS_TO_HIDE_ERROR);
  }, [closeError]);

  const velue = useMemo(
    () => ({
      showError,
      closeError,
      errors,
    }),
    [closeError, errors, showError],
  );

  return (
    <ErrorContext.Provider value={velue}>
      {children}
    </ErrorContext.Provider>
  );
};
