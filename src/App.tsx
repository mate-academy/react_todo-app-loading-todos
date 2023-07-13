import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';

import { Title } from './components/Title/Title';
import { ErrorNotification } from
  './components/ErrorNotification/ErrorNotification';
import { Content } from './components/Content/Content';
import { Todo } from './types/Todo';
import { ErrorMessages } from './enums/ErrorMessages';
import { getTodos } from './api/todos';

const USER_ID = 11076;

export const App: React.FC = () => {
  const [todosList, setTodosList] = useState<Todo[]>([]);
  const [showError, setShowError] = useState(false);

  const errorMessage = useRef<ErrorMessages>(ErrorMessages.noError);

  const resetErrorMessage = useCallback((clearTimer = false) => {
    const timerId = localStorage.getItem('timerId');

    if (timerId && clearTimer) {
      setShowError(false);
      clearTimeout(+timerId);

      return localStorage.removeItem('timerId');
    }

    const timer = setTimeout(() => {
      setShowError(false);
    }, 3000);

    return localStorage.setItem('timerId', String(timer));
  }, []);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await getTodos(USER_ID);

        setTodosList(res);
      } catch (e) {
        errorMessage.current = ErrorMessages.fetchAll;
        setShowError(true);

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
        message={errorMessage.current}
        showMessage={showError}
      />
    </div>
  );
};
