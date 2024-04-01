import React, {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  FC,
  useState,
  useEffect,
} from 'react';
import { Todo } from '../../types/Todo';
import { FilterStatus } from '../../types/FilterStatus';
import { getTodos } from '../../api/todos';

type TodosContextType = {
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  filterStatus: FilterStatus;
  setFilterStatus: Dispatch<SetStateAction<FilterStatus>>;
  filteredTodos: Todo[];
  isLoading: boolean;
  errorMessage: string;
  setErrorMessage: Dispatch<SetStateAction<string>>;
};

interface Props {
  children: React.ReactNode;
}

const initialTodos: Todo[] = [];
const initialFilterStatus: FilterStatus = FilterStatus.All;

const TodosContext = createContext<TodosContextType>({
  todos: initialTodos,
  setTodos: () => {},
  filterStatus: initialFilterStatus,
  setFilterStatus: () => {},
  filteredTodos: [],
  isLoading: false,
  errorMessage: '',
  setErrorMessage: () => {},
});

export const useTodos = () => useContext(TodosContext);

export const TodosProvider: FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [filterStatus, setFilterStatus] =
    useState<FilterStatus>(initialFilterStatus);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(data => {
        setTodos(data);
      })
      .catch(() => {
        setErrorMessage('Unable to load todos');
      })
      .finally(() => setIsLoading(false));
  }, []);

  const filteredTodos = todos.filter(todo => {
    switch (filterStatus) {
      case FilterStatus.Active:
        return !todo.completed;
      case FilterStatus.Completed:
        return todo.completed;
      default:
        return true;
    }
  });

  return (
    <TodosContext.Provider
      value={{
        isLoading,
        todos,
        setTodos,
        filterStatus,
        setFilterStatus,
        filteredTodos,
        errorMessage,
        setErrorMessage,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
