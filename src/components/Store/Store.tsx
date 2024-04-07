import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getTodos } from '../../api/todos';
import { Todo } from '../../types/Todo';
import { FilterBy } from '../../types/FilterBy';

type TodoContextType = {
  filteredTodos: Todo[];
  setTodos: (todo: Todo) => void;
  errorMessage: string;
  setErrorMessage: (textError: string) => void;
  filter: FilterBy;
  setFilter: (filter: FilterBy) => void;
  clearCompleted: () => void;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filter, setFilter] = useState(FilterBy.ALL);

  const data = async () => {
    const todo = await getTodos();

    try {
      setTodos(todo);
    } catch {
      setErrorMessage('Unable to load todos');
    }
  };

  const filteredTodos = useMemo(() => {
    let preparedTodos = [...todos];

    switch (filter) {
      case FilterBy.ACTIVE:
        preparedTodos = preparedTodos.filter(todo => !todo.completed);
        break;
      case FilterBy.COMPLETED:
        preparedTodos = preparedTodos.filter(todo => todo.completed);
        break;
      default:
        return preparedTodos;
    }

    return preparedTodos;
  }, [todos, filter]);

  const clearCompleted = useCallback(() => {
    const updateTodos = filteredTodos.filter(todo => !todo.completed);

    setTodos(updateTodos);
  }, [filteredTodos]);

  useEffect(() => {
    data();
  }, []);

  const contextValue = useMemo(
    () => ({
      todos,
      errorMessage,
      filter,
      setFilter,
      filteredTodos,
      clearCompleted,
    }),
    [todos, errorMessage, filter, filteredTodos, clearCompleted],
  );

  return (
    <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodoContext);

  if (context === undefined) {
    throw new Error('useTodos must be used within a TodosProvider');
  }

  return context;
};

export default TodoContext;
