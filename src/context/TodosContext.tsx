import React, { useEffect, useMemo, useState } from 'react';
import { Todo } from '../types/Todo';
import * as api from '../api/todos';
import { Context } from '../types/Context';
import { Status } from '../types/Status';

export const TodosContext = React.createContext<Context>({
  todos: [],
  setTodos: () => { },
  errorMessage: '',
  setErrorMessage: () => { },
  filterTodos: Status.all,
  setFilterTodos: () => { },
});

export const TodoUpdateContext = React.createContext({
  // addTodo: (todo: Todo) => {},
  // deleteTodo: (todoId: number) => {},
  // updateTodo: (todo: Todo) => {},
});

interface Props {
  children: React.ReactNode;
}

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterTodos, setFilterTodos] = useState<Status>(Status.all);

  const USER_ID = 91;

  function loadTodos() {
    api.getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');
      });
  }

  useEffect(() => {
    const errorDelay = setTimeout(() => {
      setErrorMessage('');
    }, 3000);

    return () => clearTimeout(errorDelay);
  }, [errorMessage]);

  useEffect(loadTodos, []);

  const values = useMemo(() => ({
    todos,
    setTodos,
    errorMessage,
    setErrorMessage,
    filterTodos,
    setFilterTodos,
  }), [todos, errorMessage, filterTodos]);

  return (
    // <TodoUpdateContext.Provider value={methods}>
    <TodosContext.Provider value={values}>
      {children}
    </TodosContext.Provider>
    // </TodoUpdateContext.Provider>
  );
};
