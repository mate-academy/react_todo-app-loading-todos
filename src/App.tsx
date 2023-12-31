/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { TodoComponent } from './components/Todo/TodoComponent';
import { Filter } from './types/enum/Filter';
import { Error } from './types/enum/Error';

const USER_ID = 12131;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [filter, setFilter] = useState(Filter.All);
  const [error, setError] = useState<null | Error>(null);

  const activeTodosLength = todos?.filter(({ completed }) => !completed).length;
  const hasCompletedTodos
    = todos?.filter(({ completed }) => completed).length !== 0;

  const filteredTodos = todos?.filter(todo => {
    switch (filter) {
      case Filter.All:
        return true;

      case Filter.Active:
        return !todo.completed;

      case Filter.Completed:
        return todo.completed;

      default:
        return true;
    }
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => setError(null), 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [error]);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => setError(Error.UnableToLoadTodos));
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
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

        <section className="todoapp__main" data-cy="TodoList">
          {
            todos !== null && filteredTodos && (
              filteredTodos.map(
                (todo) => <TodoComponent key={todo.id} todo={todo} />,
              )
            )
          }
        </section>

        {
          todos !== null && (
            <footer className="todoapp__footer" data-cy="Footer">
              <span className="todo-count" data-cy="TodosCounter">
                {`${activeTodosLength} items left`}
              </span>

              <nav className="filter" data-cy="Filter">
                <a
                  href="#/"
                  className={classNames('filter__link', {
                    selected: Filter.All === filter,
                  })}
                  onClick={() => setFilter(Filter.All)}
                  data-cy="FilterLinkAll"
                >
                  All
                </a>

                <a
                  href="#/active"
                  className={classNames('filter__link', {
                    selected: Filter.Active === filter,
                  })}
                  onClick={() => setFilter(Filter.Active)}
                  data-cy="FilterLinkActive"
                >
                  Active
                </a>

                <a
                  href="#/completed"
                  className={classNames('filter__link', {
                    selected: Filter.Completed === filter,
                  })}
                  onClick={() => setFilter(Filter.Completed)}
                  data-cy="FilterLinkCompleted"
                >
                  Completed
                </a>
              </nav>

              {
                hasCompletedTodos && (
                  <button
                    type="button"
                    className="todoapp__clear-completed"
                    data-cy="ClearCompletedButton"
                  >
                    Clear completed
                  </button>
                )
              }
            </footer>
          )
        }
      </div>

      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          {
            hidden: error === null,
          },
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
