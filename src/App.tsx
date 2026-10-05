/* eslint-disable max-len */
/* eslint-disable import/extensions */
/* eslint-disable jsx-a11y/control-has-associated-label */

import React, { useEffect, useState } from 'react';
import { USER_ID, getTodos } from './api/todos';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';
import { TodoFooter } from './components/TodoFooter/TodoFooter';
import { Filter } from './components/TodoFilter/TodoFilter';
import { ErrorNotification } from './components/ErrorNotification/ErrorNotification';

enum ErrorMessage {
  Load = 'Unable to load todos',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!USER_ID) {
      return;
    }

    setError('');

    getTodos()
      .then(setTodos)
      .catch(() => {
        setError(ErrorMessage.Load);
      });
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;

      if (hash === '#/active') {
        setFilter(Filter.Active);
      } else if (hash === '#/completed') {
        setFilter(Filter.Completed);
      } else {
        setFilter(Filter.All);
      }
    };

    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  useEffect(() => {
    if (!error) {
      return;
    }

    const timer = setTimeout(() => {
      setError('');
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [error]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const visibleTodos = todos.filter(todo => {
    if (filter === Filter.Active) {
      return !todo.completed;
    }

    if (filter === Filter.Completed) {
      return todo.completed;
    }

    return true;
  });

  const handleHideError = () => {
    setError('');
  };

  const allTodosCompleted =
    todos.length > 0 && todos.every(todo => todo.completed);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className={`todoapp__toggle-all ${
              allTodosCompleted ? 'active' : ''
            }`}
            data-cy="ToggleAllButton"
          />

          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {todos.length > 0 && <TodoList todos={visibleTodos} />}

        {todos.length > 0 && <TodoFooter todos={todos} filter={filter} />}
      </div>

      <ErrorNotification error={error} onClose={handleHideError} />
    </div>
  );
};
