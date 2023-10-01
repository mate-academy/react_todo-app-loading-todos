import {
  createContext, useCallback, useContext, useState,
} from 'react';
import { Todo } from '../types/Todo';
import { Filter, filterTodos } from '../utils/utils';

type Props = React.PropsWithChildren<{}>;

type TodoContextType = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  filterBy: Filter;
  filteredTodos: Todo[];
  setTodosContext: (todo: Todo[], filterBy: Filter) => void;
  errorTitle: string;
  setError: (error: string) => void;
  title: string;
  setTitleContext: (title: string) => void;
  setFilterBy: (filter: Filter) => void;
  isLoading: boolean;
  setIsLoadingContext: (bool: boolean) => void;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const AppProvider = ({ children }: Props) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState<Filter>('all');
  const [errorTitle, setErrorTitle] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  const setTodosContext = useCallback((todosArray: Todo[], filter: Filter) => {
    setTodos(filterTodos(todosArray, filter));
  }, []);

  const filteredTodos = filterTodos(todos, filterBy);

  const setError = useCallback((error: string) => {
    setErrorTitle(error);
  }, []);

  const setTitleContext = useCallback((titleInput: string) => {
    setTitle(titleInput);
  }, []);

  const setIsLoadingContext = useCallback((bool: boolean) => {
    setIsLoading(bool);
  }, []);

  return (
    <TodoContext.Provider value={{
      todos,
      setTodos,
      setTodosContext,
      filterBy,
      filteredTodos,
      errorTitle,
      setError,
      title,
      setTitleContext,
      setFilterBy,
      isLoading,
      setIsLoadingContext,
    }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = (): TodoContextType => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider');
  }

  return context;
};
