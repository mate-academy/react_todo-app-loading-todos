import {
  FC,
  useState,
  createContext,
  ReactNode,
  useMemo,
} from 'react';

type TTodoErrorProps = {
  children: ReactNode;
};

interface IErrorProvider {
  hasLoadingError: boolean;
  hasAddTodoError: boolean;
  hasDeleteTodoError: boolean;
  hasUpdateTodoError: boolean;
  hasSearchValueError: boolean;
  setHasLoadingError: (newValue: boolean) => void;
  setHasAddTodoError: (newValue: boolean) => void;
  setHasDeleteTodoError: (newValue: boolean) => void;
  setHasSearchValueError: (newValue: boolean) => void;
  setHasUpdateTodoError: (newValue: boolean) => void;
}

const initialErrorProvider: IErrorProvider = {
  hasLoadingError: false,
  hasAddTodoError: false,
  hasDeleteTodoError: false,
  hasUpdateTodoError: false,
  hasSearchValueError: false,
  setHasLoadingError: () => { },
  setHasAddTodoError: () => { },
  setHasDeleteTodoError: () => { },
  setHasUpdateTodoError: () => { },
  setHasSearchValueError: () => { },
};

export const ErrorProvider = createContext(initialErrorProvider);

export const TodoError: FC<TTodoErrorProps> = ({ children }) => {
  const [hasLoadingError, setHasLoadingError] = useState(false);
  const [hasAddTodoError, setHasAddTodoError] = useState(false);
  const [hasDeleteTodoError, setHasDeleteTodoError] = useState(false);
  const [hasUpdateTodoError, setHasUpdateTodoError] = useState(false);
  const [hasSearchValueError, setHasSearchValueError] = useState(false);

  const provider = useMemo(() => ({
    hasLoadingError,
    hasAddTodoError,
    hasUpdateTodoError,
    hasDeleteTodoError,
    hasSearchValueError,
    setHasAddTodoError,
    setHasLoadingError,
    setHasDeleteTodoError,
    setHasUpdateTodoError,
    setHasSearchValueError,
  }), [
    hasSearchValueError,
    hasLoadingError,
    hasAddTodoError,
    hasUpdateTodoError,
    hasDeleteTodoError,
  ]);

  return (
    <ErrorProvider.Provider value={provider}>
      {children}
    </ErrorProvider.Provider>
  );
};
