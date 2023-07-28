import React, { useEffect, useMemo, useState } from 'react';
import { Todo } from '../types/Todo';
import * as todoService from '../api/todos';
import { ErrorType, SelectType } from '../enums';
import { selectTodos } from '../utils/selectTodos';
import { USER_ID } from '../consts';

interface Context {
  todos: Todo[];
  error: ErrorType | null;
  select: SelectType,
  onErrorHide: (value: ErrorType | null) => void;
  onSelect: (value: SelectType) => void;
}

export const TodoContext = React.createContext<Context>({
  todos: [],
  error: null,
  select: SelectType.All,
  onErrorHide: () => {},
  onSelect: () => {},
});

type Props = {
  children: React.ReactNode
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<ErrorType | null>(null);
  const [select, setSelect] = useState(SelectType.All);

  const getTodos = async () => {
    try {
      const Alltodos = await todoService.getTodos(USER_ID);

      setTodos(Alltodos);
    } catch {
      setError(ErrorType.IncorectUrl);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  const selectedTodos = selectTodos(todos, select);

  const value: Context = useMemo(() => ({
    todos: selectedTodos,
    error,
    select,
    onErrorHide: setError,
    onSelect: setSelect,
  }), [selectedTodos, error, select]);

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};
