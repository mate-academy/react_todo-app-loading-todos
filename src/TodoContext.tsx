/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { TodoType } from './types/TodoType';
import { Filter } from './types/Filter';
import { ErrorsType } from './types/ErrorsType';
import { getTodos } from './api/todos';

const intialState: TodoType[] = [];
const USER_ID = 10236;

export const TodoContext = React.createContext({
  USER_ID,
  todos: intialState,
  filterTodo: Filter.All,
  errorMessage: '',
  getFilteredTodo: (_payLoad: Filter) => {},
  setErrorMessage: (_error: string) => {},
});

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [filterTodo, setFilterTodo] = useState(Filter.All);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setErrorMessage(ErrorsType.Load);
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      });
  }, []);

  const value = {
    USER_ID,
    todos,
    filterTodo,
    errorMessage,
    setErrorMessage,
    getFilteredTodo: (filter: Filter) => {
      setFilterTodo(filter);
    },
  };

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};
