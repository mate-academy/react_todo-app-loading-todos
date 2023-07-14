import React, {
  useCallback, useEffect, useState,
} from 'react';

import { Title } from './components/Title/Title';
import { ErrorNotification } from
  './components/ErrorNotification/ErrorNotification';
import { Content } from './components/Content/Content';
import { Todo } from './types/Todo';
import { ErrorMessages } from './enums/ErrorMessages';
import { getTodos } from './api/todos';
import { Values } from './enums/values';
import { ErrorState } from './types/ErrorState';

const USER_ID = 11076;

export const App: React.FC = () => {
  const [todosList, setTodosList] = useState<Todo[]>([]);
  const [errorState, setErrorState] = useState<ErrorState>(
    { message: ErrorMessages.noError, showError: false },
  );

  const resetErrorMessage = useCallback((clearTimer = false) => {
    const timerId = localStorage.getItem(Values.TimerId);

    if (timerId && clearTimer) {
      setErrorState((prevState) => ({ ...prevState, showError: false }));
      clearTimeout(+timerId);

      return localStorage.removeItem(Values.TimerId);
    }

    const timer = setTimeout(() => {
      setErrorState((prevState) => ({ ...prevState, showError: false }));
    }, 3000);

    return localStorage.setItem(Values.TimerId, String(timer));
  }, []);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await getTodos(USER_ID);

        setTodosList(res);
      } catch (e) {
        setErrorState({ message: ErrorMessages.fetchAll, showError: true });

        resetErrorMessage();
      }
    };

    fetchTodos();
  }, []);

  return (
    <div className="todoapp">
      <Title />

      <Content
        todos={todosList}
      />

      <ErrorNotification
        closeNotification={resetErrorMessage}
        message={errorState.message}
        showMessage={errorState.showError}
      />
    </div>
  );
};
