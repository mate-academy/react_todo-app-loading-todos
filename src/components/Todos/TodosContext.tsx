import {
  FC,
  useState,
  useEffect,
  useContext,
  ReactNode,
  createContext,
  useCallback,
} from 'react';
import { getPendingTodosByUser } from '../../api/todos';
import { Todo } from '../../types/Todo';
import { AuthContext } from '../Auth/AuthContext';

type FilterTypes = 'all' | 'active' | 'completed';

type ContextProps = {
  todos: Todo[];
  errors: string[];
  setTodos: (cb: (tds: Todo[]) => Todo[]) => void;
  setErrors: (ers: string[] | ((prv: string[]) => string[])) => void;
  filterType: FilterTypes;
  setFilterType: (fT: FilterTypes) => void;
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
      getPendingTodosByUser(user.id)
        .then(result => {
          setTodos(result);
          setLoading(false);
        });
    }
  }, []);

  const setTodosCB = useCallback((cb: (tds: Todo[]) => Todo[]) => {
    setTodos(prev => cb(prev));
  }, [setTodos]);

  const setErrorsCB = useCallback(
    (ersOrCallback: string[] | ((prv: string[]) => string[])) => {
      if (Array.isArray(ersOrCallback)) {
        setErrors(ersOrCallback);
      } else {
        setErrors(prev => ersOrCallback(prev));
      }
    }, [setErrors],
  );

  const setFilterTypeCB = useCallback((fT: FilterTypes) => {
    setFilterType(fT);
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
