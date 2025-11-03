/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect } from 'react';
import { UserWarning } from './UserWarning';
import './styles/index.scss';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/todo';
import { useState } from 'react';
// import { client } from './utils/fetchClient';
import cn from 'classnames';
import { TodoFilter } from './types/filters';
import { ErrorTypes } from './types/errorTypes';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<TodoFilter>(TodoFilter.All);

  useEffect(() => {
    setError(null);
    setLoading(true);

    getTodos()
      .then(receivedTodos => {
        setTodos(receivedTodos);
      })
      .catch(() => {
        setError(ErrorTypes.LoadTodos);
        const timeoutId = setTimeout(() => {
          setError(null);
        }, 3000);

        return () => clearTimeout(timeoutId);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const activeTodosCount = todos.filter(todo => !todo.completed).length;

  const visibleTodos = todos.filter((todo: Todo) => {
    switch (filter) {
      case TodoFilter.Active:
        return !todo.completed;
      case TodoFilter.Completed:
        return todo.completed;
      default:
        return true;
    }
  });

  const handleFilterChange = (newFilter: TodoFilter) => {
    setFilter(newFilter);
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
          />

          {/* Add a todo on form submit */}
          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {loading && <div className="loader"></div>}

        <TodoList visibleTodos={visibleTodos} />

        {todos.length > 0 && (
          <Footer
            activeTodosCount={activeTodosCount}
            currentFilter={filter}
            onFilterChange={handleFilterChange}
            todos={todos}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification is-danger is-light has-text-weight-normal',
          { ' hidden': !error },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setError(null)}
        />
        {error}
      </div>
    </div>
  );
};
