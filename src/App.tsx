/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ErrorMessage } from './components/ErrorMessage';
import { Error } from './types/Error';
import { Status } from './types/Status';
import { getTodos } from './api/todos';

const USER_ID = 11335;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');
  const [status, setStatus] = useState(Status.All);

  const showError = (notification: string) => {
    setError(notification);
    setInterval(() => {
      setError('');
    }, 3000);
  };

  const count = useMemo(() => todos.reduce(
    (total, todo) => (todo.completed ? total : total + 1), 0,
  ), [todos]);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => showError(Error.Loading));
  }, []);

  const visibleTodos = useMemo(() => todos.filter(todo => {
    switch (status) {
      case Status.Active:
        return !todo.completed;
      case Status.Completed:
        return todo.completed;
      default:
        return true;
    }
  }), [status, todos]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <Header />
        {todos.length > 0 && (
          <>
            <TodoList todos={visibleTodos} />

            <Footer
              status={status}
              setStatus={setStatus}
              count={count}
            />
          </>
        )}

        <ErrorMessage
          error={error}
          setError={setError}
        />
      </div>
    </div>
  );
};
