import {
  FC, ReactNode, createContext, useEffect, useMemo, useState,
} from 'react';
import { Todo } from '../types/Todo';
import { ErrorType } from '../types/ErrorType';
import { getTodos } from '../api/todos';
import { FilterOptions } from '../types/FillterOptions';
import { getFilteredTodos } from '../utils/getFilteredTodos';

type Props = {
  children: ReactNode;
};

interface Context {
  activeTodosLeft: number;
  todosCount: number;
  todos: Todo[];
  error: ErrorType | null;
  filterBy: FilterOptions;
  onTodosChange: (value: Todo[]) => void;
  onErrorChange: (value: ErrorType | null) => void;
  onFilterByChange: (value: FilterOptions) => void;
}

const USER_ID = 11043;

export const TodoContext = createContext({} as Context);

export const TodoProvider: FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState(FilterOptions.All);
  const [error, setError] = useState<ErrorType | null>(null);

  const filteredTodos = useMemo(() => (
    getFilteredTodos(todos, filterBy)
  ), [todos, filterBy]);

  const activeTodosLeft = todos.reduce((count, todo) => {
    if (!todo.completed) {
      return count + 1;
    }

    return count;
  }, 0);

  useEffect(() => {
    setError(null);

    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => setError(ErrorType.IncorrectUrl));
  }, []);

  const contextValue: Context = {
    activeTodosLeft,
    todosCount: todos.length,
    todos: filteredTodos,
    error,
    filterBy,
    onTodosChange: setTodos,
    onErrorChange: setError,
    onFilterByChange: setFilterBy,
  };

  return (
    <TodoContext.Provider value={contextValue}>
      {children}
    </TodoContext.Provider>
  );
};
