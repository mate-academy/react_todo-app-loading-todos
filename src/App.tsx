/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import classNames from 'classnames';

enum Filter {
  all = 'all',
  active = 'active',
  completed = 'completed',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState<Filter>(Filter.all);

  const [title, setTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('dfgdsfgdsf');

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage('Unable to load todos'));
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (!errorMessage) {
      return;
    }

    const timerID = setTimeout(() => {
      setErrorMessage('');
    }, 3000);

    return () => clearTimeout(timerID);
  }, [errorMessage]);

  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  let visibleTodos = todos;

  if (status === Filter.active) {
    visibleTodos = activeTodos;
  } else if (status === Filter.completed) {
    visibleTodos = completedTodos;
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
              value={title}
              onChange={event => setTitle(event.target.value)}
            />
          </form>
        </header>

        {todos.length === 0 ? null : (
          <>
            <section className="todoapp__main" data-cy="TodoList">
              {/* This is a completed todo */}
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
                    <div
                      className="
                      modal-background has-background-white-ter
                    "
                    />
                    <div className="loader" />
                  </div>
                </div>
              ))}

              {/* This todo is being edited */}
              {false && (
                <div data-cy="Todo" className="todo">
                  <label className="todo__status-label">
                    <input
                      data-cy="TodoStatus"
                      type="checkbox"
                      className="todo__status"
                    />
                  </label>

                  {/* This form is shown instead of the title and remove button */}
                  <form>
                    <input
                      data-cy="TodoTitleField"
                      type="text"
                      className="todo__title-field"
                      placeholder="Empty todo will be deleted"
                      value="Todo is being edited now"
                    />
                  </form>

                  <div data-cy="TodoLoader" className="modal overlay">
                    <div
                      className="
                      modal-background has-background-white-ter
                      "
                    />
                    <div className="loader" />
                  </div>
                </div>
              )}
            </section>

            <footer className="todoapp__footer" data-cy="Footer">
              <span className="todo-count" data-cy="TodosCounter">
                {`${activeTodos.length} items left`}
              </span>

              {/* Active link should have the 'selected' class */}
              <nav className="filter" data-cy="Filter">
                <a
                  href="#/"
                  data-cy="FilterLinkAll"
                  onClick={() => setStatus(Filter.all)}
                  className={classNames('filter__link', {
                    selected: status === Filter.all,
                  })}
                >
                  All
                </a>

                <a
                  href="#/active"
                  data-cy="FilterLinkActive"
                  onClick={() => setStatus(Filter.active)}
                  className={classNames('filter__link', {
                    selected: status === Filter.active,
                  })}
                >
                  Active
                </a>

                <a
                  href="#/completed"
                  data-cy="FilterLinkCompleted"
                  onClick={() => setStatus(Filter.completed)}
                  className={classNames('filter__link', {
                    selected: status === Filter.completed,
                  })}
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
          </>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          {
            hidden: !errorMessage,
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
  );
};

// Unable to load todos
// <br />
// Title should not be empty
// <br />
// Unable to add a todo
// <br />
// Unable to delete a todo
// <br />
// Unable to update a todo
