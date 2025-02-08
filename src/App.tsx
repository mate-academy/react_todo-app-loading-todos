/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState('all');
  const [query, setQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [counterTodos, setCounterTodos] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const timerId = useRef(0);

  const filteredTodos = todos.filter(todo => {
    if (status === 'active') {
      return !todo.completed;
    }

    if (status === 'completed') {
      return todo.completed;
    }

    return todo;
  });

  const handleQueryChanged = (newValue: string) => {
    setQuery(newValue);
  };

  useEffect(() => {
    if (inputRef.current !== null) {
      inputRef.current.focus();
    }

    window.clearTimeout(timerId.current);

    getTodos()
      .then(todosComplete => {
        setTodos(todosComplete);
        const activeTodo = todosComplete.filter(todo => !todo.completed).length;

        setCounterTodos(activeTodo);
      })
      .catch(() => {
        {
          setErrorMessage('Unable to load todos');
          timerId.current = window.setTimeout(() => {
            setErrorMessage('');
          }, 3000);
        }
      });
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.clearTimeout(timerId.current);

    if (!query) {
      setErrorMessage('Title should not be empty');
      timerId.current = window.setTimeout(() => {
        setErrorMessage('');
      }, 3000);

      return;
    }
  };

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
          <form onSubmit={handleSubmit}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              ref={inputRef}
              value={query}
              onChange={event => {
                handleQueryChanged(event.target.value);
              }}
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {/* This is a completed todo */}
          {filteredTodos.map(todo => (
            <div
              data-cy="Todo"
              className={todo.completed ? 'todo completed' : 'todo'}
              key={todo.id}
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

              {/* Remove button appears only on hover */}
              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
              >
                ×
              </button>

              {/* overlay will cover the todo while it is being deleted or updated */}
              <div data-cy="TodoLoader" className="modal overlay">
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div>
          ))}
        </section>

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {counterTodos} items left
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={
                  status === 'all' ? 'filter__link selected' : 'filter__link'
                }
                data-cy="FilterLinkAll"
                onClick={() => {
                  setStatus('all');
                }}
              >
                All
              </a>

              <a
                href="#/active"
                className={
                  status === 'active' ? 'filter__link selected' : 'filter__link'
                }
                data-cy="FilterLinkActive"
                onClick={() => {
                  setStatus('active');
                }}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={
                  status === 'completed'
                    ? 'filter__link selected'
                    : 'filter__link'
                }
                data-cy="FilterLinkCompleted"
                onClick={() => {
                  setStatus('completed');
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
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={
          errorMessage === ''
            ? 'notification is-danger is-light has-text-weight-normal hidden'
            : 'notification is-danger is-light has-text-weight-normal'
        }
      >
        <button data-cy="HideErrorButton" type="button" className="delete" />
        {/* show only one message at a time */}
        {errorMessage}
        {/* Unable to load todos
        <br />
        Title should not be empty
        <br />
        Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo */}
      </div>
    </div>
  );
};
