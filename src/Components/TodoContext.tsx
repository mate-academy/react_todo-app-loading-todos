import React, { useEffect, useMemo, useState } from 'react';
import { Todo } from '../types/Todo';
import { getTodos } from '../api/todos';

export enum FilterSettings {
  all = 'all',
  active = 'active',
  completed = 'completed',
}

type Props = {
  children: React.ReactNode;
};

type TodoContextType = {
  todosList: Todo[];
  setTodosList: (v: Todo[]) => void;

  newTodo: Todo;
  setNewTodo: (newTodo: Todo) => void;

  filterSettings: FilterSettings;
  setFilterSettings: (v: FilterSettings) => void;

  errorMessage: string;
  setErrorMessage: (v: string) => void;

  newTodosProcessing: boolean;
  setNewTodosProcessing: (v: boolean) => void;
};

export const todoPattern = {
  title: '',
  id: +new Date(),
  completed: false,
  userId: 501,
};

export const TodoContext = React.createContext<TodoContextType>({
  todosList: [],
  setTodosList: () => {},
  newTodo: todoPattern,
  setNewTodo: () => {},
  filterSettings: FilterSettings.all,
  setFilterSettings: () => {},
  errorMessage: '',
  setErrorMessage: () => {},
  newTodosProcessing: false,
  setNewTodosProcessing: () => {},
});

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [newTodo, setNewTodo] = useState(todoPattern);

  const [todosList, setTodosList] = useState<Todo[]>([]);

  const [filterSettings, setFilterSettings] = useState(FilterSettings.all);

  const [errorMessage, setErrorMessage] = useState('');

  const [newTodosProcessing, setNewTodosProcessing] = useState(false);

  const initialTodosList = () => {
    getTodos()
      .then(todos => setTodosList(todos))
      .catch(() => {
        setErrorMessage('Unable to load todos');
        setTimeout(() => setErrorMessage(''), 3000);
      });
  };

  useEffect(() => {
    initialTodosList();
  }, [newTodosProcessing]);

  const value = useMemo<TodoContextType>(
    () => ({
      todosList,
      setTodosList,
      newTodo,
      setNewTodo,
      filterSettings,
      setFilterSettings,
      errorMessage,
      setErrorMessage,
      newTodosProcessing,
      setNewTodosProcessing,
    }),
    [todosList, newTodo, filterSettings, errorMessage, newTodosProcessing],
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
