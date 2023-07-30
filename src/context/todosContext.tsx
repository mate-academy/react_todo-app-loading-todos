import React, { useEffect, useState } from 'react';
import { getTodos } from '../api/todos';
import { FilterBy, Todo } from '../types/Todo';

const USER_ID = 11144;

interface Todos {
  USER_ID: number;
  todos: Todo[];
  filterBy: FilterBy;
  errorMessage: string;
  setFilterBy: (filter: FilterBy) => void;
  setErrorMessage: (error: string) => void;
}

export const TodosContext = React.createContext<Todos>({
  USER_ID,
  todos: [],
  filterBy: FilterBy.ALL,
  errorMessage: '',
  setFilterBy: () => {},
  setErrorMessage: () => {},
});

interface Props {
  children: React.ReactNode;
}

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState<FilterBy>(FilterBy.ALL);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Can not load data');
      });
  }, []);

  const todosValues = {
    USER_ID,
    todos,
    filterBy,
    errorMessage,
    setFilterBy,
    setErrorMessage,
  };

  return (
    <TodosContext.Provider value={todosValues}>
      {children}
    </TodosContext.Provider>
  );
};
