import React, { useState, useEffect, useContext } from 'react';

import { getTodos } from '../api/todos';

import { FilterParams } from '../types/FilterParams';
import { ErrorMessages } from '../types/ErrorMessages';
import { Todo } from '../types/Todo';
import { USER_ID } from './user';

interface TodosContextInterface {
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,

  filteredTodos: Todo[],

  errorMessage: ErrorMessages,
  setErrorMessage: React.Dispatch<React.SetStateAction<ErrorMessages>>,

  titleOfLoadingTodo: string,
  setTitleOfLoadingTodo: React.Dispatch<React.SetStateAction<string>>,

  isAllCompleted: boolean | null,
  setIsAllCompleted: React.Dispatch<React.SetStateAction<boolean | null>>,

  filterParam: FilterParams,
  setFilterParam: React.Dispatch<React.SetStateAction<FilterParams>>,

  isCompletedTodosCleared: boolean,
  setIsCompletedTodosCleared: React.Dispatch<React.SetStateAction<boolean>>,
}

export const TodosContext = React.createContext<TodosContextInterface>({
  todos: [],
  setTodos: () => {},

  filteredTodos: [],

  errorMessage: ErrorMessages.Default,
  setErrorMessage: () => {},

  titleOfLoadingTodo: '',
  setTitleOfLoadingTodo: () => {},

  isAllCompleted: null,
  setIsAllCompleted: () => {},

  filterParam: FilterParams.All,
  setFilterParam: () => {},

  isCompletedTodosCleared: false,
  setIsCompletedTodosCleared: () => {},
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
  const [titleOfLoadingTodo, setTitleOfLoadingTodo] = useState('');
  const [isAllCompleted, setIsAllCompleted]
  = useState<null | boolean>(null);

  const [filterParam, setFilterParam]
  = useState<FilterParams>(FilterParams.All);

  const [isCompletedTodosCleared, setIsCompletedTodosCleared] = useState(false);

  const filteredTodos = getFilteredTodos(todos, filterParam);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => setErrorMessage(ErrorMessages.UnableToLoad));
  }, []);

  const value = {
    todos,
    setTodos,

    filteredTodos,

    errorMessage,
    setErrorMessage,

    titleOfLoadingTodo,
    setTitleOfLoadingTodo,

    isAllCompleted,
    setIsAllCompleted,

    filterParam,
    setFilterParam,

    isCompletedTodosCleared,
    setIsCompletedTodosCleared,
  };

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};

export const UseTodosContext = () => {
  const context = useContext(TodosContext);

  return context;
};
