import {
  ReactNode, createContext, useContext, useEffect, useMemo, useState,
} from 'react';
import { Todo } from '../types/Todo';
import { getTodos } from '../api/todos';
import { ErrorType } from '../types/ErrorTypes';
import { Filter } from '../types/Filter';
import { USER_ID } from '../utils/userId';

type TodosProps = {
  todos: Todo[];
  visibleTodos: Todo[];
  taskName: string;
  setTaskName: (query: string) => void;
  filterBy: Filter;
  setFilterBy: (query: Filter) => void,
  countIncompleteTask: number;
  error: null | ErrorType;
  setError: (err: ErrorType | null) => void;
  visibleTasks: Todo[];
};

const TodosContext = createContext<TodosProps>({
  todos: [],
  visibleTodos: [],
  taskName: '',
  setTaskName: () => undefined,
  filterBy: 'all',
  setFilterBy: () => undefined,
  countIncompleteTask: 0,
  error: null,
  setError: () => undefined,
  visibleTasks: [],
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
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [taskName, setTaskName] = useState<string>('');
  const [filterBy, setFilterBy] = useState<Filter>('all');
  // const [count] = useState<number>(0);
  const [error, setError] = useState<null | ErrorType>(null);

  const visibleTasks = useMemo(() => {
    return dataFilter(todos, filterBy);
  }, [todos, filterBy]);

  const countIncompleteTask = useMemo(() => {
    return dataFilter(todos, 'active').length;
  }, [todos]);

  const value = {
    todos,
    taskName,
    setTaskName,
    filterBy,
    setFilterBy,
    countIncompleteTask,
    error,
    setError,
    visibleTodos,
    visibleTasks,
  };

  useEffect(() => {
    try {
      getTodos(USER_ID)
        .then(data => {
          setTodos(data);
          setVisibleTodos(data);
        });
    } catch (err) {
      setError(ErrorType.Load);
    }
  }, []);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = () => useContext(TodosContext);
