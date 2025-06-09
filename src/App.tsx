/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import { addTodo, getTodos, USER_ID } from './api/todos';

import { Todo } from './types/Todo';
import { TodoItem } from './components/TodoItem';
import classNames from 'classnames';
import { ErrorMessage } from './types/ErrorMessage';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>('');
  const [loading, setLoading] = useState(true);
  const [activeLink, setActiveLink] = useState('all');

  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (errorMessage) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(() => {
        setErrorMessage('');
        timeoutRef.current = null;
      }, 3000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [errorMessage]);

  useEffect(() => {
    getTodos()
      .then(allTodos => setTodos(allTodos))
      .catch(() => setErrorMessage('Unable to load todos'))
      .finally(() => setLoading(false));
  }, []);

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
          <form
            onSubmit={event => {
              event.preventDefault();

              if (!title) {
                setErrorMessage('Title should not be empty');

                return;
              }

              addTodo({
                userId: 3025,
                title: title,
                completed: false,
              })
                .then(() => {
                  setTitle('');
                })
                .catch(error => {
                  setErrorMessage(' Unable to add a todo');
                  throw error;
                });
            }}
          >
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={title}
              onChange={e => {
                setTitle(e.target.value);
                setErrorMessage('');
              }}
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {todos
            .filter(todo => {
              switch (activeLink) {
                case 'all':
                  return true;
                case 'active':
                  return !todo.completed;
                case 'completed':
                  return todo.completed;
              }
            })
            .map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                loading={loading}
                // updateTodos={updateTodos}
              />
            ))}
        </section>

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {/* {`${activeTodos.length} items left`} */}
              {`4 items left`}
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={classNames('filter__link', {
                  selected: activeLink === 'all',
                })}
                data-cy="FilterLinkAll"
                onClick={() => {
                  setActiveLink('all');
                }}
              >
                All
              </a>

              <a
                href="#/active"
                className={classNames('filter__link', {
                  selected: activeLink === 'active',
                })}
                data-cy="FilterLinkActive"
                onClick={() => {
                  setActiveLink('active');
                }}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={classNames('filter__link', {
                  selected: activeLink === 'completed',
                })}
                data-cy="FilterLinkCompleted"
                onClick={() => {
                  setActiveLink('completed');
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
              // disabled={completedTodos.length === 0 ? true : false}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          { hidden: !errorMessage },
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
  );
};
