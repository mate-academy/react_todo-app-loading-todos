/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';

import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState('all');
  const [errorMessage, setErrorMessage] = useState('');

  function loadTodos() {
    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage('Unable to load todos'))
  }

  useEffect(loadTodos, []);

  useEffect(() => {
    if (!errorMessage) {
      return;
    }

    const timerId = setTimeout(() => setErrorMessage(''), 3000);

    return () => clearTimeout(timerId); // clear if component re-renders
  }, [errorMessage]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <TodoList
      todos={todos}
      setStatus={setStatus}
      status={status}
      setErrorMessage={setErrorMessage}
      errorMessage={errorMessage}
    />
  );
};
