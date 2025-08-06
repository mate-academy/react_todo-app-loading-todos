/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';

import * as todoService from './api/todos';
import { Todo } from './types/Todo';
import { Footer } from './components/Footer';
import classNames from 'classnames';
import { FilterType } from './types/FilterType';
import { TodoItem } from './components/TodoItem';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');
  const [hasErrorMessage, setHasErrorMessage] = useState(false);
  const [filter, setFilter] = useState('all');

  function loadTodos() {
    setError('');
    setHasErrorMessage(false);

    todoService
      .getTodos()
      .then(setTodos)
      .catch(() => {
        setError('Unable to load todos');
        setHasErrorMessage(true);
        setTimeout(() => {
          setHasErrorMessage(false);
        }, 3000);
      });
  }

  useEffect(loadTodos, []);

  const visibleTodos = todos.filter(todo => {
    if (filter === FilterType.Active) {
      return !todo.completed;
    }

    if (filter === FilterType.Completed) {
      return todo.completed;
    }

    return true;
  });

  const activeTodosLength = todos.filter(todo => !todo.completed).length;

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
            className={classNames('todoapp__toggle-all', {
              active: !activeTodosLength,
            })}
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

        <section className="todoapp__main" data-cy="TodoList">
          {visibleTodos.map(todo => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </section>

        {todos.length !== 0 && (
          <Footer
            filtered={filter}
            onFiltered={setFilter}
            activeTodos={activeTodosLength}
          />
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          {
            hidden: !hasErrorMessage,
          },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setHasErrorMessage(false)}
        />
        {error}
      </div>
    </div>
  );
};
