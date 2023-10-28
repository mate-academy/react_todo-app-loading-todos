/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { Todo } from '../../types/Todo';

interface InterfaceTodosContext {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  filteredTodos: Todo[];
  setFilteredTodos: React.Dispatch<React.SetStateAction<Todo[]>>;

  isLoadTodoError: boolean,
  setIsLoadTodoError: React.Dispatch<React.SetStateAction<boolean>>;
  isTitleEmpty: boolean,
  setIsTitleEmpty: React.Dispatch<React.SetStateAction<boolean>>;
  isUnableAddTodo: boolean,
  setIsUnableAddTodo: React.Dispatch<React.SetStateAction<boolean>>,
  isUnableDeleteTodo: boolean,
  setIsUnableDeleteTodo: React.Dispatch<React.SetStateAction<boolean>>,
  isUnableUpdateTodo: boolean,
  setIsUnableUpdateTodo: React.Dispatch<React.SetStateAction<boolean>>,
  hasError: boolean,
  setHasError: React.Dispatch<React.SetStateAction<boolean>>,
}

type Props = {
  children: React.ReactNode,
};

export const TodosContext = React.createContext<InterfaceTodosContext>({
  todos: [],
  setTodos: () => {},
  filteredTodos: [],
  setFilteredTodos: () => {},

  isUnableAddTodo: false,
  setIsUnableAddTodo: () => {},
  isUnableDeleteTodo: false,
  setIsUnableDeleteTodo: () => {},
  isUnableUpdateTodo: false,
  setIsUnableUpdateTodo: () => {},
  isLoadTodoError: true,
  setIsLoadTodoError: () => {},
  isTitleEmpty: false,
  setIsTitleEmpty: () => {},
  hasError: false,
  setHasError: () => {},
});

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState(todos);

  const [isLoadTodoError, setIsLoadTodoError] = useState(true);
  const [isTitleEmpty, setIsTitleEmpty] = useState(false);
  const [isUnableAddTodo, setIsUnableAddTodo] = useState(false);
  const [isUnableDeleteTodo, setIsUnableDeleteTodo] = useState(false);
  const [isUnableUpdateTodo, setIsUnableUpdateTodo] = useState(false);

  const [hasError, setHasError] = useState(isTitleEmpty || isLoadTodoError);

  return (
    <TodosContext.Provider value={{
      todos,
      setTodos,
      filteredTodos,
      setFilteredTodos,

      isLoadTodoError,
      setIsLoadTodoError,
      isTitleEmpty,
      setIsTitleEmpty,
      isUnableAddTodo,
      setIsUnableAddTodo,
      isUnableDeleteTodo,
      setIsUnableDeleteTodo,
      isUnableUpdateTodo,
      setIsUnableUpdateTodo,
      hasError,
      setHasError,
    }}
    >
      {children}
    </TodosContext.Provider>
  );
};

// export const useTodos = () => useContext(TodosContext);
