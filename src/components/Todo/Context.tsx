import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Todo } from '../../types/Todo';
import { getTodos } from '../../api/todos';

export type FilterOption = 'All' | 'Active' | 'Completed';

type HandleChangeFilter = (filter: FilterOption) => void;
type HandleClearError = () => void;

type ApiContextValue = {
  handleChangeFilter: HandleChangeFilter;
  handleClearError: HandleClearError;
};

type ErrorContextValue = {
  errorMessage: string;
  errorShown: boolean;
};

const TodosContext = React.createContext<Todo[] | null>(null);
const FilterContext = React.createContext<FilterOption | null>(null);
const ErrorContext = React.createContext<ErrorContextValue | null>(null);
const ApiContext = React.createContext<ApiContextValue | null>(null);

type Props = React.PropsWithChildren;

let errorTimeoutId = 0;

export const TodoProvider = ({ children }: Props) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterOption>('All');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorShown, setErrorShown] = useState(false);

  const handleClearError = useCallback(() => {
    window.clearTimeout(errorTimeoutId);
    setErrorShown(false);
    window.setTimeout(() => setErrorMessage(''), 1000);
  }, []);

  const handleSendError = useCallback(
    (message: string) => {
      window.clearTimeout(errorTimeoutId);
      setErrorMessage(message);
      setErrorShown(true);

      errorTimeoutId = window.setTimeout(handleClearError, 3000);
    },
    [handleClearError],
  );

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => handleSendError('Unable to load todos'));
  }, [handleSendError]);

  const handleChangeFilter = (newFilter: FilterOption) => {
    setFilter(newFilter);
  };

  const apiValue = useMemo(
    () => ({
      handleChangeFilter,
      handleClearError,
    }),
    [handleClearError],
  );

  const errorValue = useMemo(
    () => ({
      errorMessage,
      errorShown,
    }),
    [errorMessage, errorShown],
  );

  return (
    <ApiContext.Provider value={apiValue}>
      <ErrorContext.Provider value={errorValue}>
        <FilterContext.Provider value={filter}>
          <TodosContext.Provider value={todos}>
            {children}
          </TodosContext.Provider>
        </FilterContext.Provider>
      </ErrorContext.Provider>
    </ApiContext.Provider>
  );
};

export const useTodoTodos = () => {
  const value = useContext(TodosContext);

  if (!value) {
    throw new Error('TodoProvider is missing!!!');
  }

  return value;
};

export const useTodoFilter = () => {
  const value = useContext(FilterContext);

  if (!value) {
    throw new Error('TodoProvider is missing!!!');
  }

  return value;
};

export const useTodoError = () => {
  const value = useContext(ErrorContext);

  if (!value) {
    throw new Error('TodoProvider is missing!!!');
  }

  return value;
};

export const useTodoApi = () => {
  const value = useContext(ApiContext);

  if (!value) {
    throw new Error('TodoProvider is missing!!!');
  }

  return value;
};
