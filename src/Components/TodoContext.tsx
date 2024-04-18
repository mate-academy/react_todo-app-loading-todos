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

  newTodoProcessing: boolean;
  setNewTodoProcessing: (v: boolean) => void;
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
  newTodoProcessing: false,
  setNewTodoProcessing: () => {},
});

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [newTodo, setNewTodo] = useState(todoPattern);

  const [todosList, setTodosList] = useState<Todo[]>([]);

  const [filterSettings, setFilterSettings] = useState(FilterSettings.all);

  const [errorMessage, setErrorMessage] = useState('');

  const [newTodoProcessing, setNewTodoProcessing] = useState(false);

  const [firstRender, setFirstRender] = useState(true);

  const initialTodosList = () => {
    getTodos()
      .then(todos => setTodosList(todos))
      .catch(() => {
        if (firstRender) {
          setErrorMessage('Unable to load todos');
          setTimeout(() => setErrorMessage(''), 3000);
        }
      });
    setFirstRender(false);
  };

  useEffect(() => {
    initialTodosList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newTodoProcessing]);

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
      newTodoProcessing,
      setNewTodoProcessing,
    }),
    [todosList, newTodo, filterSettings, errorMessage, newTodoProcessing],
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
