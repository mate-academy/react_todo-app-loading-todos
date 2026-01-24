/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { FilterType } from './types/FilterType';
import { ErrorMessage } from './types/ErrorMessage';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<FilterType>(FilterType.All);
  const [isLoading, setIsLoading] = useState(true);

  // Load todos on component mount
  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setError(ErrorMessage.LoadTodos);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // Hide error notification after 3 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 3000);

      return () => clearTimeout(timer);
    }

    return undefined;
  }, [error]);

  // Filter todos based on current filter
  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case FilterType.Active:
        return !todo.completed;
      case FilterType.Completed:
        return todo.completed;
      default:
        return true;
    }
  });

  const completedCount = todos.filter(todo => todo.completed).length;
  const activeCount = todos.length - completedCount;
  const allCompleted = todos.length > 0 && completedCount === todos.length;

  const handleErrorClose = () => {
    setError('');
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          allCompleted={allCompleted}
          todosCount={todos.length}
          isLoading={isLoading}
        />

        {todos.length > 0 && (
          <>
            <TodoList todos={filteredTodos} isLoading={isLoading} />

            <Footer
              filter={filter}
              activeCount={activeCount}
              completedCount={completedCount}
              onFilterChange={setFilter}
            />
          </>
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal${
          error ? '' : ' hidden'
        }`}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={handleErrorClose}
        />
        {error}
      </div>
    </div>
  );
};
