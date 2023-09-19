import React, { useMemo, useState, useEffect } from 'react';

import { getTodos } from '../api/todos';

import { FilterParams } from '../types/FilterParams';
import { ErrorMessages } from '../types/ErrorMessages';
import { Todo } from '../types/Todo';
import { USER_ID } from './user';

const TodosContext = React.createContext({
  // todos: [],
  // loadingTodoTitle: '',
  // setErrorMessage: () => {},
  // handleTodoDelete: () => {},
  // handleTodoUpdate: () => {},
  // isAllCompleted: null,
  // setIsAllCompleted: () => {},
  // clearCompleted: false,
  // setClearCompleted: () => {},
  // setFilterParam: () => {},
  // filterParam: null,
  // handleTodosUpdate: () => {},
  // setLoadingTodoTitle: () => {},
});

const getFilteredTodos = (todos: Todo[], completionStatus: FilterParams) => {
  if (completionStatus === 'All') {
    return [...todos];
  }

  const isCompleted = completionStatus === FilterParams.Completed;

  return todos.filter(({ completed }) => completed === isCompleted);
};

type Props = {
  children: React.ReactNode,
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [errorMessage, setErrorMessage]
  = useState<ErrorMessages>(ErrorMessages.Default);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loadingTodoTitle, setLoadingTodoTitle] = useState('');
  const [isAllCompleted, setIsAllCompleted]
  = useState<null | boolean>(null);
  const [filterParam, setFilterParam]
 = useState<FilterParams>(FilterParams.All);
  const [clearCompleted, setClearCompleted] = useState(false);

  const filteredTodos = getFilteredTodos(todos, filterParam);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos);
  }, []);

  const value = useMemo(() => ({
    errorMessage,
    setErrorMessage,
    todos,
    setTodos,
    loadingTodoTitle,
    setLoadingTodoTitle,
    isAllCompleted,
    setIsAllCompleted,
    filterParam,
    setFilterParam,
    clearCompleted,
    setClearCompleted,
    filteredTodos,
  }), [errorMessage]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
