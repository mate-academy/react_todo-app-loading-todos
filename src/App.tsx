/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { Header } from './components/Header';
import { Status } from './types/Status';
import { Footer } from './components/Footer';
import { TodoList } from './components/TodoList';
import { ErrorNotification } from './components/Error';
import { Error } from './types/Error';

const USER_ID = 11126;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorNotification, setErrorNotification] = useState('');
  const [status, setStatus] = useState(Status.All);

  const count = useMemo(() => todos.reduce(
    (total, todo) => (todo.completed ? total : total + 1),
    0,
  ), [todos]);

  const showErrorNotification = (notification: string): void => {
    setErrorNotification(notification);

    setInterval(() => {
      setErrorNotification('');
    }, 3000);
  };

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => showErrorNotification(Error.Load));
  }, []);

  const visibleTodos = useMemo(() => todos.filter(todo => {
    switch (status) {
      case Status.Completed:
        return todo.completed;

      case Status.Active:
        return !todo.completed;

      default:
        return true;
    }
  }), [todos, status]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        {todos.length > 0 && <TodoList todos={visibleTodos} />}
        {todos.length > 0 && (
          <Footer
            count={count}
            status={status}
            setStatus={setStatus}
          />
        )}
      </div>
      <ErrorNotification
        notification={errorNotification}
        setNotification={setErrorNotification}
      />
    </div>
  );
};
