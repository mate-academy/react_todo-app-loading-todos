/* eslint-disable max-len, jsx-a11y/control-has-associated-label */
import React, { useEffect } from 'react';
import classNames from 'classnames';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';

type Status = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [title, setTitle] = React.useState('');
  const [status, setStatus] = React.useState<Status>('all');
  const [errorMessage, setErrorMessage] = React.useState('');

  useEffect(() => {
    getTodos().then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');
      });
  }, []);

  useEffect(() => {
    if (!errorMessage) {
      return () => {};
    }

    const timerId = setTimeout(() => {
      setErrorMessage('');
    }, 3000);

    return () => clearTimeout(timerId);
  }, [errorMessage]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  let activeTodos = todos.filter(todo => !todo.completed);
  let completedTodos = todos.filter(todo => todo.completed);

  let visibleTodos = todos;

  if (status === 'active') {
    visibleTodos = activeTodos;
  } else if (status === 'completed'){
    visibleTodos = completedTodos;
  }

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
          <form onSubmit={handleSubmit}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              name="title"
              value={title}
              onChange={event => setTitle(event.target.value)}
            />
          </form>
        </header>

        {/* Hide the footer if there are no todos */}
        {todos.length === 0 ? null : (
          <>
            <section className="todoapp__main" data-cy="TodoList">
              {visibleTodos.map(todo => (
                <div
                  key={todo.id}
                  data-cy="Todo"
                  className={classNames('todo', {
                    completed: todo.completed,
                  })}
                >
                  <label className="todo__status-label">
                    <input
                      data-cy="TodoStatus"
                      type="checkbox"
                      className="todo__status"
                      checked={todo.completed}
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
                    ×
                  </button>

                  <div
                    data-cy="TodoLoader"
                    className={classNames('modal overlay', {
                      'is-active': false,
                    })}
                  >
                    <div className="modal-background has-background-white-ter" />
                    <div className="loader" />
                  </div>
                </div>
              ))}
            </section>

            <footer className="todoapp__footer" data-cy="Footer">
              <span className="todo-count" data-cy="TodosCounter">
                {activeTodos.length} items left
              </span>

              <nav className="filter" data-cy="Filter">
                <a
                  href="#/"
                  data-cy="FilterLinkAll"
                  onClick={() => setStatus('all')}
                  className={classNames('filter__link', {
                    selected: status === 'all',
                  })}
                >
                  All
                </a>

                <a
                  href="#/active"
                  data-cy="FilterLinkActive"
                  onClick={() => setStatus('active')}
                  className={classNames('filter__link', {
                    selected: status === 'active',
                  })}
                >
                  Active
                </a>

                <a
                  href="#/completed"
                  data-cy="FilterLinkCompleted"
                  onClick={() => setStatus('completed')}
                  className={classNames('filter__link', {
                    selected: status === 'completed',
                  })}
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
          </>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={classNames('notification is-danger is-light has-text-weight-normal', {
          hidden: !errorMessage,
        })}
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
