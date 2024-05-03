import React from 'react';
import { useEffect, useState } from 'react';

import { Todo } from '../types/Todo';
import * as clientService from '../api/todos';
import { TodoListContext } from './TodoListContext';

// import { KEY_STORAGE } from '../constants/constants';
import { Filters } from '../types/Filters';
import { ERROR_LOAD } from '../constants/constants';

type TodoListProviderType = {
  children: React.ReactNode;
};

export const TodoListProvider: React.FC<TodoListProviderType> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [currentFilter, setCurrentFilter] = useState<string>(Filters.All);

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
      })
      .catch(() => {
        setErrorMessage(ERROR_LOAD);
      });
  }, []);

  const getValue = () => {
    return {
      todos,
      errorMessage,
      currentFilter,
      setCurrentFilter,
    };
  };

  return (
    <TodoListContext.Provider value={getValue()}>
      {children}
    </TodoListContext.Provider>
  );
};
