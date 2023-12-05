/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Status, Todo } from './types/Todo';
import { getTodos, getVisibleTodos } from './api/todos';
import { TodoFilter } from './components/TodosFilter';
import { ToogleButton } from './components/ToogleButton';
import { TodoForm } from './components/TodoForm';
import { TodosList } from './components/TodosList';
import { Error } from './types/Error';
import { ErrorNotifications } from './components/ErrorNotifications';

const USER_ID = 11955;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState(Status.All);
  const [errorType, setErrorType] = useState<Error | null>(null);

  useEffect(() => {
    getTodos(USER_ID)
      .then(response => {
        setTodos(response);
      })
      .catch((error) => {
        setErrorType(Error.Load);
        throw error;
      });
  }, []);

  const shownTodos = useMemo(() => {
    return getVisibleTodos(todos, status);
  }, [todos, status]);

  const areAllActiveTodos = todos.some(todo => !todo.completed);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <ToogleButton areAllActiveTodos={areAllActiveTodos} />

          <TodoForm />
        </header>

        <TodosList visibleTodos={shownTodos} />

        {!!todos.length && (
          <TodoFilter
            todos={todos}
            status={status}
            setStatus={setStatus}
            areAllActiveTodos={areAllActiveTodos}
            setErrorType={setErrorType}
          />
        )}
      </div>

      {errorType && (
        <ErrorNotifications errorType={errorType} setErrorType={setErrorType} />
      )}
    </div>
  );
};
