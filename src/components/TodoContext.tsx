import { Todo } from '../types/Todo';
import { FilterButtons } from '../types/FilterType';
import { createContext, useState } from 'react';
import React from 'react';

export type ContextType = {
  todos: Todo[];
  toDoTitle: string;
  setTodos: (currentTodos: Todo[]) => void;
  setToDoTitle: (title: string) => void;
  filterButton: FilterButtons;
  setFilterButton: (filterButton: FilterButtons) => void;
  error: string;
  setError: (error: string) => void;
};

type Props = {
  children: React.ReactNode;
};

const ProvideContext: ContextType = {
  todos: [],
  toDoTitle: '',
  setTodos: () => {},
  setToDoTitle: () => {},
  filterButton: FilterButtons.All,
  setFilterButton: () => {},
  error: '',
  setError: () => {},
};

export const CreatedContext = createContext<ContextType>(ProvideContext);

export const ToDoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [toDoTitle, setToDoTitle] = useState<string>('');
  const [filterButton, setFilterButton] = useState<FilterButtons>(
    FilterButtons.All,
  );
  const [error, setError] = useState<string>('');

  return (
    <CreatedContext.Provider
      value={{
        todos,
        toDoTitle,
        setTodos,
        setToDoTitle,
        filterButton,
        setFilterButton,
        error,
        setError,
      }}
    >
      {children}
    </CreatedContext.Provider>
  );
};
