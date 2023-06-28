/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';

import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Notifications } from './components/Notifications';

const USER_ID = 10873;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getTodos(USER_ID)
      .then((todosFromServer: Todo[]) => setTodos(todosFromServer))
      .catch(() => setError('Unable to get todos'));
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (error) {
      timeoutId = setTimeout(() => setError(null), 3000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [error]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const visibleTodos = [...todos];

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList todos={visibleTodos} />

        {todos.length > 0 && <Footer />}
      </div>

      <Notifications error={error} setError={setError} />
    </div>
  );
};
