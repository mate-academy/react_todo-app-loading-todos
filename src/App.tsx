/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    setErrorMessage('');
    getTodos()
      .then(result => {
        setTodos(result);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setErrorMessage('Unable to load todos');
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      });
  }, []);

  let filteredTodos = todos;

  if (filter === 'active') {
    filteredTodos = todos.filter(todo => todo.completed === false);
  }

  if (filter === 'completed') {
    filteredTodos = todos.filter(todo => todo.completed === true);
  }

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
        {loading ? (
          <div className="loader" />
        ) : (
          todos.length > 0 && (
            <>
              <section className="todoapp__main" data-cy="TodoList">
                {filteredTodos.map(todo => (
                  <div
                    key={todo.id}
                    data-cy="Todo"
                    className={todo.completed ? 'todo completed' : 'todo'}
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

              {/* Hide the footer if there are no todos */}
              <footer className="todoapp__footer" data-cy="Footer">
                <span className="todo-count" data-cy="TodosCounter">
                  {todos.filter(todo => todo.completed === false).length} items left
                </span>

                {/* Active link should have the 'selected' class */}
                <nav className="filter" data-cy="Filter">
                  <a
                    href="#/"
                    onClick={() => setFilter('all')}
                    className={
                      filter === 'all'
                        ? 'filter__link selected'
                        : 'filter__link'
                    }
                    data-cy="FilterLinkAll"
                  >
                    All
                  </a>

                  <a
                    href="#/active"
                    onClick={() => setFilter('active')}
                    className={
                      filter === 'active'
                        ? 'filter__link selected'
                        : 'filter__link'
                    }
                    data-cy="FilterLinkActive"
                  >
                    Active
                  </a>

                  <a
                    href="#/completed"
                    onClick={() => setFilter('completed')}
                    className={
                      filter === 'completed'
                        ? 'filter__link selected'
                        : 'filter__link'
                    }
                    data-cy="FilterLinkCompleted"
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
          )
        )}
        {/* DON'T use conditional rendering to hide the notification */}
        {/* Add the 'hidden' class to hide the message smoothly */}
        <div
          data-cy="ErrorNotification"
          className={
            errorMessage
              ? 'notification is-danger is-light has-text-weight-normal'
              : 'notification is-danger is-light has-text-weight-normal hidden'
          }
        >
          <button
            data-cy="HideErrorButton"
            type="button"
            className="delete"
            onClick={() => setErrorMessage('')}
          />
          {/* show only one message at a time */}
          {errorMessage}
        </div>
      </div>
    </div>
  );
};
