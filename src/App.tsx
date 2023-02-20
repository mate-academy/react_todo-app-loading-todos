/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { createTodo } from './api/todos';

type Status = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [status, setStatus] = useState<Status>('all');
  const [addTodo, setAddTodo] = useState('');

  /* const loadTodos = async () => {
    try {
      const loadedTodos = await getTodos(USER_ID);

      setTodos(loadedTodos);
    } catch (error) {
      setErrorMessage('Unable to load todos');
    }
  };

  useEffect(() => {
    loadTodos();
  }, []); */

  // preffered this one because it's safer
  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');
      });
  });

  useEffect(() => {
    if (!errorMessage) {
      return;
    }

    const timerId = setTimeout(() => {
      setErrorMessage('');
    }, 3000);

    // eslint-disable-next-line consistent-return
    return () => {
      clearTimeout(timerId);
    };
  }, [errorMessage]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    createTodo(addTodo)
      .then(newTodo => {
        setTodos(todos.concat(newTodo));
      });
  }

  let visibleTodos = todos;

  if (status === 'active') {
    visibleTodos = todos.filter(todo => !todo.completed);
  }

  if (status === 'completed') {
    visibleTodos = todos.filter(todo => todo.completed);
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          <button type="button" className="todoapp__toggle-all active" />

          {/* Add a todo on form submit */}
          <form onSubmit={(handleSubmit)}>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={addTodo}
              onChange={e => setAddTodo(e.target.value)}
            />
          </form>
        </header>

        <section className="todoapp__main">
          {visibleTodos.map(todo => (
            <div
              className={classNames('todo',
                { completed: todo.completed === true })}
              key={todo.id}
            >
              <label className="todo__status-label">
                <input
                  type="checkbox"
                  className="todo__status"
                  checked={todo.completed}
                />
              </label>

              <span className="todo__title">{todo.title}</span>

              <button type="button" className="todo__remove">×</button>

              {false && (
                <form>
                  <input
                    type="text"
                    className="todo__title-field"
                    placeholder="Empty todo will be deleted"
                    value="Todo is being edited now"
                  />
                </form>
              )}

              <div
                className={classNames('modal overlay', {
                  'is-active': todo.completed,
                })}
              >
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div>
          ))}
        </section>

        {/* Hide the footer if there are no todos */}
        <footer className="todoapp__footer">
          <span className="todo-count">
            3 items left
          </span>

          {/* Active filter should have a 'selected' class */}
          <nav className="filter">
            <a
              href="#/"
              className={classNames('filter__link', {
                selected: status === 'all',
              })}
              onClick={() => setStatus('all')}
            >
              All
            </a>

            <a
              href="#/active"
              className={classNames('filter__link', {
                selected: status === 'active',
              })}
              onClick={() => setStatus('active')}
            >
              Active
            </a>

            <a
              href="#/completed"
              className={classNames('filter__link', {
                selected: status === 'completed',
              })}
              onClick={() => setStatus('completed')}
            >
              Completed
            </a>
          </nav>

          {/* don't show this button if there are no completed todos */}
          <button type="button" className="todoapp__clear-completed">
            Clear completed
          </button>
        </footer>
      </div>

      {/* Notification is shown in case of any error */}
      {errorMessage && (
        <div
          // eslint-disable-next-line max-len
          className={classNames('notification is-danger is-light has-text-weight-normal', {
            hidden: !errorMessage,
          })}
        >
          <button
            type="button"
            className="delete"
            onClick={() => setErrorMessage('')}
          />
          {errorMessage}
        </div>
      )}
    </div>
  );
};
