import React, { createContext, useContext } from 'react';
import { TodosContextValue, useTodos } from '../hooks/useTodos';

interface TodosProviderProps {
  children: React.ReactNode;
}

const initialTodosContextValue: TodosContextValue = {
  todos: [],
  setTodos: () => {},
  isLoading: false,
  setIsLoading: () => {},
  errors: {},
  triggerError: () => {},
  setErrors: () => {},
  loadingIds: [],
  addTodoAndSubmit: () => {},
  deletingTodo: () => {},
  updatingTodo: () => {},
  toggleAllTodos: () => {},
};

const TodosContext = createContext<TodosContextValue>(initialTodosContextValue);

export const TodosProvider: React.FC<TodosProviderProps> = ({ children }) => {
  const todosValue = useTodos();

  return (
    <TodosContext.Provider value={todosValue}>{children}</TodosContext.Provider>
  );
};

export const useTodosContext = () => {
  const context = useContext(TodosContext);

  if (!context) {
    throw new Error('Here is Context Error');
  }

  return context;
};
