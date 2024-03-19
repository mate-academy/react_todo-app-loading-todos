import { createContext, useState } from 'react';
import { Todo } from '../types';

export const TodosContext = createContext<Todo[]>([]);
// eslint-disable-next-line
export const SetTodosContext = createContext<React.Dispatch<React.SetStateAction<Todo[]>>>(() => []);

type Props = {
  children: React.ReactNode;
};

export const TodosContextProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  return (
    <TodosContext.Provider value={todos}>
      <SetTodosContext.Provider value={setTodos}>
        {children}
      </SetTodosContext.Provider>
    </TodosContext.Provider>
  );
};
