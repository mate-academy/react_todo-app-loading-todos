/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect, useMemo } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { StatusFilter } from './types/Filter';
import { getTodos } from './api/todos';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';

const USER_ID = 11587;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterStatus, setFilterStatus] = useState(StatusFilter.ALL);

  useEffect(() => {
    setLoading(true);

    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtredTodos: Todo[] = useMemo(() => {
    let filtered = todos;

    switch (filterStatus) {
      case StatusFilter.ACTIVE:
        filtered = filtered.filter(todo => !todo.completed);
        break;

      case StatusFilter.COMPLETED:
        filtered = filtered.filter(todo => todo.completed);
        break;

      default:
        break;
    }

    return filtered;
  }, [todos, filterStatus]);

  const countActiveTodos = todos.filter(todo => !todo.completed).length;

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length && (
            <button
              type="button"
              className="todoapp__toggle-all active"
              data-cy="ToggleAllButton"
            />
          )}

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

        {!loading && (
          <>
            <TodoList
              todos={filtredTodos}
            />

            {todos.length > 0 && (
              <footer className="todoapp__footer" data-cy="Footer">
                <span className="todo-count" data-cy="TodosCounter">
                  {`${countActiveTodos} items left`}
                </span>

                {/* Active filter should have a 'selected' class */}

                <TodoFilter
                  filter={filterStatus}
                  setFilter={setFilterStatus}
                />

                <nav className="filter" data-cy="Filter">
                  <a
                    href="#/"
                    className="filter__link selected"
                    data-cy="FilterLinkAll"
                  >
                    All
                  </a>

                  <a
                    href="#/active"
                    className="filter__link"
                    data-cy="FilterLinkActive"
                  >
                    Active
                  </a>

                  <a
                    href="#/completed"
                    className="filter__link"
                    data-cy="FilterLinkCompleted"
                  >
                    Completed
                  </a>
                </nav>

                {/* don't show this button if there are no completed todos */}
                <button
                  type="button"
                  className="todoapp__clear-completed"
                  data-cy="ClearCompletedButton"
                >
                  Clear completed
                </button>
              </footer>
            )}
          </>
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          errorMessage ? '' : 'hidden',
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage('')}
        />
        {/* <br />
        Unable to load todos
        <br />
        Title should not be empty
        <br />
        Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo */}
        {errorMessage}
      </div>
    </div>
  );
};
