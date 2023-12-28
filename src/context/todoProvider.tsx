import {
  ReactNode, createContext, useContext, useEffect, useState,
} from 'react';
import { Todo } from '../types/Todo';
import { getTodos } from '../api/todos';
import { ErrorType } from '../types/ErrorTypes';
import { Filter } from '../types/Filter';
import { USER_ID } from '../utils/userId';

type TodosProps = {
  todos: Todo[];
  taskName: string;
  setTaskName: (query: string) => void;
  filterBy: Filter;
  setFilterBy: (query: Filter) => void,
  count: number;
  error: null | ErrorType;
  setError: (err: ErrorType | null) => void;
};

const TodosContext = createContext<TodosProps>({
  todos: [],
  taskName: '',
  setTaskName: () => undefined,
  filterBy: 'all',
  setFilterBy: () => undefined,
  count: 0,
  error: null,
  setError: () => undefined,
});

type Props = {
  children: ReactNode;
};

const dataFilter = (data: Todo[], filtr: string) => {
  switch (filtr) {
    case 'active':
      return data.filter(task => !task.completed);
    case 'completed':
      return data.filter(task => task.completed);
    default:
      return data;
  }
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [taskName, setTaskName] = useState<string>('');
  const [filterBy, setFilterBy] = useState<Filter>('all');
  const [count, setCount] = useState<number>(0);
  const [error, setError] = useState<null | ErrorType>(null);

  const value = {
    todos,
    taskName,
    setTaskName,
    filterBy,
    setFilterBy,
    count,
    error,
    setError,
  };

  useEffect(() => {
    try {
      getTodos(USER_ID)
        .then(data => setTodos(dataFilter(data, filterBy)));
    } catch (err) {
      setError(ErrorType.Load);
    }

    const counter = dataFilter(todos, 'active').length;

    setCount(counter);
  }, [todos, filterBy, count]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = () => useContext(TodosContext);
