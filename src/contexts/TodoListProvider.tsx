import React from 'react';
import { useEffect, useState } from 'react';

import { Todo } from '../types/Todo';
import * as clientService from '../api/todos';
import { TodoListContext } from './TodoListContext';

import { KEY_STORAGE } from '../constants/constants';

type TodoListProviderType = {
  children: React.ReactNode;
};

const ERROR_LOAD = 'Unable to load todos';

export const TodoListProvider: React.FC<TodoListProviderType> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    return JSON.parse(String(localStorage.getItem(KEY_STORAGE))) || [];
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const errorMessagePoint = setTimeout(() => {
      setErrorMessage('');
    }, 3000);

    return () => clearTimeout(errorMessagePoint);
  }, [errorMessage]);

  useEffect(() => {
    clientService
      .getTodos()
      .then(data => {
        setTodos(data);
        localStorage.setItem(KEY_STORAGE, JSON.stringify(data));
      })
      .catch(() => {
        setErrorMessage(ERROR_LOAD);
      });
  }, []);

  const loadAllTodos = () => {
    clientService
      .getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage(ERROR_LOAD);
      });
  };

  const loadCompletedTodos = () => {
    clientService
      .getCompletedTodos()
      .then(data => setTodos(data))
      .catch(() => {
        setErrorMessage(ERROR_LOAD);
      });
  };

  const loadActiveTodos = () => {
    clientService
      .getActiveTodos()
      .then(data => setTodos(data))
      .catch(() => {
        setErrorMessage(ERROR_LOAD);
      });
  };

  const getValue = () => {
    return {
      todos,
      errorMessage,
      loadCompletedTodos,
      loadActiveTodos,
      loadAllTodos,
    };
  };

  return (
    <TodoListContext.Provider value={getValue()}>
      {children}
    </TodoListContext.Provider>
  );
};
