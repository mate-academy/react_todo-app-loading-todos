import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import classNames from 'classnames';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterStatus, setFilterStatus] = useState<
    'all' | 'active' | 'completed'
  >('all');

  useEffect(() => {
    const delay = setTimeout(() => {
      setErrorMessage('');
      getTodos()
        .then(setTodos)
        .catch(() => {
          setErrorMessage('Unable to load todos');
        });
    }, 150);

    return () => clearTimeout(delay);
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (errorMessage !== '') {
      timer = setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [errorMessage]);

  const visibleTodos = todos.filter(todo =>
    filterStatus === 'all'
      ? true
      : filterStatus === 'active'
        ? !todo.completed
        : todo.completed,
  );

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

        {todos?.length > 0 && (
          <div>
            <section className="todoapp__main" data-cy="TodoList">
              {visibleTodos.map(todo => (
                <div
                  data-cy="Todo"
                  className={classNames('todo', {
                    completed: todo.completed,
                  })}
                  key={todo.id}
                >
                  <label
                    className="todo__status-label"
                    htmlFor={`todo-status-${todo.id}`}
                  >
                    <input
                      id={`todo-status-${todo.id}`}
                      data-cy="TodoStatus"
                      type="checkbox"
                      className="todo__status"
                      checked={todo.completed}
                      onChange={() => {}}
                    />
                  </label>
                  <span data-cy="TodoTitle" className="todo__title">
                    {todo.title}
                  </span>
                  <button
                    type="button"
                    className="todo__remove"
                    data-cy="TodoDelete"
                  >
                    x
                  </button>
                  <div data-cy="TodoLoader" className="modal overlay">
                    <div
                      className="modal-background
                    has-background-white-ter"
                    />
                    <div className="loader" />
                  </div>
                </div>
              ))}
            </section>
            <footer className="todoapp__footer" data-cy="Footer">
              <span className="todo-count" data-cy="TodosCounter">
                {todos.filter(todo => !todo.completed).length} items left
              </span>

              {/* Active link should have the 'selected' class */}
              <nav className="filter" data-cy="Filter">
                <a
                  href="#/"
                  className={classNames('filter__link', {
                    selected: filterStatus === 'all',
                  })}
                  data-cy="FilterLinkAll"
                  onClick={event => {
                    event.preventDefault();
                    setFilterStatus('all');
                  }}
                >
                  All
                </a>

                <a
                  href="#/active"
                  className={classNames('filter__link', {
                    selected: filterStatus === 'active',
                  })}
                  data-cy="FilterLinkActive"
                  onClick={event => {
                    event.preventDefault();
                    setFilterStatus('active');
                  }}
                >
                  Active
                </a>

                <a
                  href="#/completed"
                  className={classNames('filter__link', {
                    selected: filterStatus === 'completed',
                  })}
                  data-cy="FilterLinkCompleted"
                  onClick={event => {
                    event.preventDefault();
                    setFilterStatus('completed');
                  }}
                >
                  Completed
                </a>
              </nav>

              {/* this button should be disabled if there are no completed todos */}
              <button
                type="button"
                className="todoapp__clear-completed"
                data-cy="ClearCompletedButton"
              >
                Clear completed
              </button>
            </footer>
          </div>
        )}

        {/* DON'T use conditional rendering to hide the notification */}
        {/* Add the 'hidden' class to hide the message smoothly */}
        <div
          data-cy="ErrorNotification"
          className={classNames(
            'notification is-danger is-light has-text-weight-normal',
            {
              hidden: errorMessage === '',
            },
          )}
        >
          <button
            data-cy="HideErrorButton"
            type="button"
            className="delete"
            onClick={() => setErrorMessage('')}
          />
          {errorMessage}
        </div>
      </div>
    </div>
  );
};
