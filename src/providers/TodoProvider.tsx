import {
  FC, createContext, useContext, useEffect, useState,
} from 'react';
import { Todo } from '../types/Todo';
import { getTodos, postTodo } from '../api/todos';
import { Filter } from '../types/Filter';
import { ErrorType } from '../types/ErrorType';

type TodoContextType = {
  USER_ID: number;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  visibleTodos: Todo[];
  setVisibleTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  addTodo: (todo: Todo) => void;
  modifiedTodo: number | null;
  setModifiedTodo: React.Dispatch<React.SetStateAction<number | null>>;
  todosLeft: number;
  activeFilter: Filter;
  setActiveFilter: React.Dispatch<React.SetStateAction<Filter>>;
  error: ErrorType | null;
  setError: React.Dispatch<React.SetStateAction<ErrorType | null>>;
};

const TodoContext = createContext<TodoContextType>({} as TodoContextType);

type Props = {
  children: React.ReactNode
};

export const TodoProvider: FC<Props> = ({ children }) => {
  const USER_ID = 11288;
  const [todos, setTodos] = useState<Todo[]>([] as Todo[]);
  const [modifiedTodo, setModifiedTodo] = useState<number | null>(null);
  const [todosLeft, setTodosLeft] = useState<number>(0);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([] as Todo[]);
  const [activeFilter, setActiveFilter] = useState<Filter>('all');
  const [error, setError] = useState<ErrorType | null>(null);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => setError('load'));
  }, []);

  useEffect(() => {
    let uncompleted = 0;

    todos.forEach(todo => {
      if (!todo.completed) {
        uncompleted += 1;
      }
    });

    setTodosLeft(uncompleted);
    setVisibleTodos(todos);
  }, [todos]);

  useEffect(() => {
    setVisibleTodos(todos.filter((todo) => {
      switch (activeFilter) {
        case 'active':
          return !todo.completed;
        case 'completed':
          return todo.completed;
        default:
          return true;
      }
    }));
  }, [todos, activeFilter]);

  const addTodo = (todo: Todo) => {
    postTodo(USER_ID, todo)
      .then(data => {
        setTodos(prev => [data, ...prev]);
      })
      // eslint-disable-next-line no-console
      .catch(console.warn);
  };

  const value = {
    USER_ID,
    todos,
    setTodos,
    visibleTodos,
    setVisibleTodos,
    addTodo,
    modifiedTodo,
    setModifiedTodo,
    todosLeft,
    activeFilter,
    setActiveFilter,
    error,
    setError,
  };

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => useContext(TodoContext);
