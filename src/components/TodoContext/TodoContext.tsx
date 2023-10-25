import React, { useMemo, useState, useEffect } from 'react';

import { Todo } from '../../types/Todo';
import { FilterStatus } from '../../types/FilterStatus';
import { ErrorMessage } from '../../types/Error';
import { USER_ID } from '../../utils/UserID';
import * as todoService from '../../api/todos';

type TodoContext = {
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  filter: FilterStatus,
  setFilter: (status: FilterStatus) => void,
  filterTodos: () => Todo[],
  errorMessage: ErrorMessage,
  setErrorMessage: (message: ErrorMessage) => void,
};

type Props = {
  children: React.ReactNode,
};

export const TodosContext = React.createContext<TodoContext>({
  todos: [],
  setTodos: () => {},
  filter: FilterStatus.ALL,
  setFilter: () => {},
  filterTodos: () => [],
  errorMessage: ErrorMessage.None,
  setErrorMessage: () => {},
});

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState(FilterStatus.ALL);
  const [errorMessage, setErrorMessage] = useState(ErrorMessage.None);

  useEffect(() => {
    todoService.getTodos(USER_ID)
      .then(setTodos)
      .catch(() => setErrorMessage(ErrorMessage.Load));
  }, []);

  useEffect(() => {
    if (errorMessage) {
      window.setTimeout(() => {
        setErrorMessage(ErrorMessage.None);
      }, 3000);
    }
  }, [errorMessage]);

  const filterTodos = () => {
    switch (filter) {
      case FilterStatus.ACTIVE:
        return todos.filter(todo => !todo.completed);
      case FilterStatus.COMPLETED:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  };

  const todoState = useMemo(() => ({
    todos,
    setTodos,
    filterTodos,
    filter,
    setFilter,
    errorMessage,
    setErrorMessage,
  }), [todos, filter, errorMessage]);

  return (
    <TodosContext.Provider value={todoState}>
      {children}
    </TodosContext.Provider>
  );
};
