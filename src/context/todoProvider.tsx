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
  count: number;
  error: null | ErrorType;
  setError: (err: ErrorType | null) => void;
};

const TodosContext = createContext<TodosProps>({
  todos: [],
  visibleTodos: [],
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
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
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
    visibleTodos,
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

  // useEffect(() => {
  //   const visible = dataFilter(todos, filterBy);

  //   setVisibleTodos(visible);
  //   const counter = dataFilter(todos, 'active').length;

  //   setCount(counter);
  // }, [filterBy, todos]);
  useMemo(() => {
    const visible = dataFilter(todos, filterBy);
    const counter = dataFilter(todos, 'active').length;

    setVisibleTodos(visible);
    setCount(counter);
    // return { visibleTodos, counter };
  }, [filterBy, todos]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = () => useContext(TodosContext);
