/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import Header from './components/Header';
import { Footer } from './components/Footer';
import { Todo } from './types/Todo';
import { ErrorType } from './types/Errors';
import { Status } from './types/Status';
import TodoList from './components/ToDoList';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorType, setErrorType] = useState<ErrorType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<Status>(Status.ALL);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setErrorType(ErrorType.LOAD_TODOS))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (errorType) {
      const timer = setTimeout(() => setErrorType(null), 3000);

      return () => clearTimeout(timer);
    }

    return undefined;
  }, [errorType]);

  const handleCloseError = () => setErrorType(null);

  const filteredTodos = todos.filter(todo => {
    if (filter === Status.ACTIVE) {
      return !todo.completed;
    }

    if (filter === Status.COMPLETED) {
      return todo.completed;
    }

    return true;
  });

  const activeTodosCount = todos.filter(todo => !todo.completed).length;

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      {!isLoading && errorType && (
        <p className="notification is-danger">{errorType}</p>
      )}

      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {todos.length > 0 && <TodoList todos={filteredTodos} />}

        {todos.length > 0 && (
          <Footer
            filter={filter}
            setFilter={setFilter}
            activeCount={activeTodosCount}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${errorType ? '' : 'hidden'}`}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={handleCloseError}
        />
        {errorType}
      </div>
    </div>
  );
};
