/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './components/UserWarning/UserWarning';
import { client } from './utils/fetchClient';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Errors } from './components/Errors/Errors';
import { Status } from './types/Status';
import { ErrorSpec } from './types/ErrorSpec';

const USER_ID = 12021;
const ADDED_URL = `/todos?userId=${USER_ID}`;

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [hasErrors, setHasErrors] = useState(false);
  const [error, setError] = useState<ErrorSpec | null>(null);
  const [status, setStatus] = useState<Status>(Status.ALL);
  const [hasCompleted, setHasCompleted] = useState(false);

  useEffect(() => {
    client
      .get<Todo[]>(ADDED_URL)
      .then((todos) => {
        setTodosFromServer(todos);
        if (todos.length === 0) {
          setError(ErrorSpec.EMPTY_TITLE);
        }
      })
      .catch(() => setError(ErrorSpec.NOT_LOADED));
  }, []);

  const filteredTodos = useMemo(() => {
    if (todosFromServer.some(todo => todo.completed)) {
      setHasCompleted(true);
    }

    switch (status) {
      case Status.ACTIVE:
        return todosFromServer.filter(todo => !todo.completed);

      case Status.COMPLETED:
        return todosFromServer.filter(todo => todo.completed);

      default:
        return todosFromServer;
    }
  }, [status, todosFromServer]);

  const handleStatus = (newStatus: Status) => {
    setStatus(newStatus);
  };

  const clearCompleted = () => {
    setHasCompleted(false);
  };

  if (!USER_ID) {
    setHasErrors(true);

    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {todosFromServer.length > 0 && <TodoList todos={filteredTodos} />}

        {/* Hide the footer if there are no todos */}
        {todosFromServer.length > 0 && (
          <Footer
            todosLength={filteredTodos.length}
            onStatus={handleStatus}
            status={status}
            hasCompletedTodos={hasCompleted}
            handleClear={clearCompleted}
          />
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      {hasErrors && <Errors error={error} />}
    </div>
  );
};
