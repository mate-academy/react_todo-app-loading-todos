import { createContext, useEffect, useState } from 'react';
import { TodosContextType, TodosProviderType } from './types';
import { getTodos } from '../../api/todos';

export const TodosContext
= createContext<TodosContextType | undefined>(undefined);

export const UsersProvider = ({ children }: TodosProviderType) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos(11524).then(setTodos);
  }, []);

  return (
    <TodosContext.Provider value={{
      todos,
    }}
    >
      <>{children}</>
    </TodosContext.Provider>
  );
};
