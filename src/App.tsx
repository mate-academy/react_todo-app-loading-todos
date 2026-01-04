/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { ErrorText } from './types/ErrorText';
import { Filter } from './types/Filter';
import { TodoItem } from './components/TodoItem';
import { TodoHeader } from './components/TodoHeader';
import { TodoFooter } from './components/TodoFooter';
import classNames from 'classnames';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);

    getTodos()
      .then(setTodos)
      .catch(() => setError(ErrorText.Load));
  }, []);

  useEffect(() => {
    if (!error) {
      return;
    }

    const timer = window.setTimeout(() => {
      setError(null);
    }, 3000);

    return () => window.clearTimeout(timer);
  }, [error]);

  const isAllCompleted =
    todos.length > 0 && todos.every(todo => todo.completed);

  const visibleTodos = useMemo(
    () =>
      todos.filter(todo => {
        switch (filter) {
          case Filter.Active:
            return !todo.completed;

          case Filter.Completed:
            return todo.completed;

          default:
            return true;
        }
      }),
    [todos, filter],
  );
  const handleFilterClick =
    (value: Filter) => (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      setFilter(value);
    };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader isAllCompleted={isAllCompleted} />

        {todos.length > 0 && (
          <section className="todoapp__main" data-cy="TodoList">
            {visibleTodos.map(todo => (
              <TodoItem todo={todo} key={todo.id} />
            ))}
          </section>
        )}

        {todos.length > 0 && (
          <TodoFooter
            todos={todos}
            filter={filter}
            handleFilterClick={handleFilterClick}
          />
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !error },
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
