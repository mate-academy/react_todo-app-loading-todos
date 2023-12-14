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
  const [uncompletedTodosCount, setUncompletedTodosCount] = useState<number>(0);

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

  useEffect(() => {
    const completedCount = todosFromServer.filter(
      todo => !todo.completed,
    ).length;

    setUncompletedTodosCount(completedCount);
  }, [todosFromServer, status]);

  const filteredTodos = useMemo(() => {
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
    setUncompletedTodosCount(0);
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
            onStatus={handleStatus}
            status={status}
            completedCount={uncompletedTodosCount}
            handleClear={clearCompleted}
            isClearNeeded={uncompletedTodosCount === filteredTodos.length}
          />
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      {hasErrors && <Errors error={error} />}
    </div>
  );
};
