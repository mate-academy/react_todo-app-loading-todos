import {
  FC,
  useState,
  useEffect,
  useContext,
  ReactNode,
  createContext,
  useCallback,
} from 'react';
import { Todo } from '../../types/Todo';
import { AuthContext } from '../Auth/AuthContext';
import { getPendingTodosByUserId } from '../../api/todos';

type FilterTypes = 'all' | 'active' | 'completed';

type ContextProps = {
  todos: Todo[];
  errors: string[];
  setTodos: (callback: (prevTodos: Todo[]) => Todo[]) => void;
  setErrors: (errorsOrCallback: string[]
  | ((prevErrors: string[]) => string[])) => void;
  filterType: FilterTypes;
  setFilterType: (newFilterType: FilterTypes) => void;
};

export const TodosContext = createContext<ContextProps>({
  todos: [],
  setTodos: () => {},
  errors: [],
  setErrors: () => {},
  filterType: 'all',
  setFilterType: () => '',
});

type Props = {
  children: ReactNode;
};

export const TodosProvider: FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState(true);

  const user = useContext(AuthContext);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [filterType, setFilterType] = useState<FilterTypes>('all');

  useEffect(() => {
    if (user) {
      getPendingTodosByUserId(user.id)
        .then(result => {
          setTodos(result);
          setLoading(false);
        });
    }
  }, []);

  const setTodosCB = useCallback((callback: (prevTodos: Todo[]) => Todo[]) => {
    setTodos(prev => callback(prev));
  }, [setTodos]);

  const setErrorsCB = useCallback(
    (errorsOrCallback: string[]
    | ((prevErrors: string[]) => string[])) => {
      if (Array.isArray(errorsOrCallback)) {
        setErrors(errorsOrCallback);
      } else {
        setErrors(prev => errorsOrCallback(prev));
      }
    }, [setErrors],
  );

  const setFilterTypeCB = useCallback((newFilterType: FilterTypes) => {
    setFilterType(newFilterType);
  }, [setFilterType]);

  if (loading) {
    return null;
  }

  return (
    <TodosContext.Provider value={{
      todos,
      errors,
      setTodos: setTodosCB,
      setErrors: setErrorsCB,
      filterType,
      setFilterType: setFilterTypeCB,
    }}
    >
      {children}
    </TodosContext.Provider>
  );
};
