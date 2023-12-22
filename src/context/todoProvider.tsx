import {
  ReactNode, createContext, useContext, useEffect, useState,
} from 'react';
import { Todo } from '../types/Todo';
import { getTodos } from '../api/todos';

type TodosProps = {
  todos: Todo[];
  taskName: string;
  setTaskName: (query: string) => void;
  filterBy: string;
  setFilterBy: (query: string) => void,
  count: number;
  error: string | null;
  setError: (err: string) => void;
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
  const [filterBy, setFilterBy] = useState<string>('all');
  const [count, setCount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

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
      getTodos(12075)
        .then(data => setTodos(dataFilter(data, filterBy)));
    } catch (err) {
      setError('Unable to load todos');
    }

    const counter = todos.filter(task => !task.completed).length;

    setCount(counter);
  }, [todos, filterBy, count]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = () => useContext(TodosContext);
