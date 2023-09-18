/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Todo } from './types/Todo';
import { Status } from './types/Status';
import * as todoService from './api/todos';
import { TodoList } from './components/TodoList';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState<Status>(Status.All);
  const [errorMessage, setErrorMessage] = useState('');

  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const completedTodosCount = todos.filter(todo => todo.completed).length;

  const visibleTodos = todos.filter(todo => {
    switch (status) {
      case Status.Active:
        return !todo.completed;

      case Status.Completed:
        return todo.completed;

      case Status.All:
      default:
        return true;
    }
  });

  useEffect(() => {
    todoService.getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage('Unable to load a todo'));
  }, []);

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
  }, [errorMessage]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (
            <button
              type="button"
              className={classNames('todoapp__toggle-all', {
                active: completedTodosCount !== 0,
              })}
            />
          )}

          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <TodoList
          todos={visibleTodos}
        />

        {todos.length > 0 && (
          <footer className="todoapp__footer">
            <span className="todo-count">
              {`${activeTodosCount} items left`}
            </span>

            <nav className="filter">
              <a
                href="#/"
                className={classNames('filter__link', {
                  selected: status === Status.All,
                })}
                onClick={() => setStatus(Status.All)}
              >
                All
              </a>

              <a
                href="#/active"
                className={classNames('filter__link', {
                  selected: status === Status.Active,
                })}
                onClick={() => setStatus(Status.Active)}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={classNames('filter__link', {
                  selected: status === Status.Completed,
                })}
                onClick={() => setStatus(Status.Completed)}
              >
                Completed
              </a>
            </nav>

            <button
              type="button"
              className={classNames('todoapp__clear-completed', {
                'todoapp__clear-completed--hidden': completedTodosCount === 0,
              })}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      <div
        className={errorMessage
          ? 'notification is-danger is-light has-text-weight-normal'
          : 'notification is-danger is-light has-text-weight-normal hidden'}
      >
        <button
          type="button"
          className="delete"
          onClick={() => setErrorMessage('')}
        />

        {errorMessage}
      </div>
    </div>
  );
};
