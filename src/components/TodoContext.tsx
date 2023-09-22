import {
  ReactNode, SetStateAction, createContext, useContext, useEffect, useState,
} from 'react';
import { getTodos } from '../api/todos';
import { SortTypes, Todo } from '../types/Todo';

export interface TContext {
  todos: Todo[];
  hasError: null | string;
  handleError: (error:SetStateAction<null>) => void;
  sortType: SortTypes;
  setSortType: React.Dispatch<SetStateAction<SortTypes>>;
}

// Tworzymy kontekst
const TodoContext = createContext<TContext | null>(null);

// Tworzymy funkcje dostarczające kontekst do komponentów
export function useTodoContext() {
  return useContext(TodoContext);
}

const USER_ID = 11550;

export function TodoProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [hasError, setHasError] = useState(null);
  const [sortType, setSortType] = useState<SortTypes>('all');

  const handleError = (error: SetStateAction<null>) => {
    setHasError(error);
  };

  useEffect(() => {
    // GET TODOS
    getTodos(USER_ID)
      .then((res) => {
        setTodos(res);
      })
      .catch((error) => {
        handleError(error.message);
      });
  }, []);

  // const addTodo = (title: string) => {
  //   // Dodaj zadanie do stanu zadań
  //   setTodos([...todos: any, { title, completed: false }]);
  // };

  const contextValues: TContext = {
    todos,
    hasError,
    handleError,
    sortType,
    setSortType,
  };

  return (
    <TodoContext.Provider value={contextValues}>
      {children}
    </TodoContext.Provider>
  );
}
