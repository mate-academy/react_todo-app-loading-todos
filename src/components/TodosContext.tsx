import React, { useEffect, useMemo, useState } from 'react';
import { getTodos } from '../api/todos';
import { Todo } from '../types/Todo';
import { FilterStatus } from '../types/FilterStatus';
import { Errors } from '../types/Errors';

const DELAY_ERROR_DISAPPEAR = 3000;

type PropsContext = {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  filter: FilterStatus;
  setFilter: (filter: FilterStatus) => void;
  incompleteCount: number;
  messageError: string;
  setMessageError: (message: Errors) => void;
};

export const TodosContext = React.createContext<PropsContext>({
  todos: [],
  setTodos: () => {},
  filter: FilterStatus.All,
  setFilter: () => {},
  incompleteCount: 0,
  messageError: '',
  setMessageError: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState(FilterStatus.All);
  const [messageError, setMessageError] = useState(Errors.NoError);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(error => {
        setMessageError(Errors.CantLoad);
        setTimeout(
          () => setMessageError(Errors.NoError),
          DELAY_ERROR_DISAPPEAR,
        );
        throw error;
      });
  }, []);

  let incompleteCount = todos.filter(todo => !todo.completed).length;

  useEffect(() => {
    // eslint-disable-next-line
    incompleteCount = todos.filter(todo => !todo.completed).length;
  }, [todos]);

  const valueTodos = useMemo(
    () => ({
      todos,
      setTodos,
      incompleteCount,
      filter,
      setFilter,
      messageError,
      setMessageError,
    }),
    // eslint-disable-next-line
    [todos, incompleteCount, filter, messageError],
  );

  return (
    <TodosContext.Provider value={valueTodos}>{children}</TodosContext.Provider>
  );
};
