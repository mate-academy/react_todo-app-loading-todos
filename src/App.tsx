/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { useEffect } from 'react';
import { useState } from 'react';
import cn from 'classnames';

enum FILTERS {
  all = 'all',
  completed = 'completed',
  active = 'active',
}

const LOAD_ERROR = {
  LOAD_TODOS: 'Unable to load todos',
};

export const App: React.FC = () => {
  const [todo, setTodo] = useState<Todo[]>([]);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState(FILTERS.all);

  useEffect(() => {
    getTodos()
      .then(data => setTodo(data))
      .catch(() => setError(LOAD_ERROR.LOAD_TODOS));
  }, []);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  }, [error]);

  const filterTodo = todo.filter(todos => {
    if (selected === FILTERS.active) {
      return !todos.completed;
    }

    if (selected === FILTERS.completed) {
      return todos.completed;
    }

    return true;
  });

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
        {todo.length > 0 && (
          <section className={cn('todoapp__main')} data-cy="TodoList">
            {filterTodo.map(todos => (
              <div
                data-cy="Todo"
                className={`todo ${todos.completed ? 'completed' : ''}`}
                key={todos.id}
              >
                <label className="todo__status-label">
                  <input
                    data-cy="TodoStatus"
                    type="checkbox"
                    className="todo__status"
                    checked={todos.completed}
                    readOnly
                  />
                </label>

                <span data-cy="TodoTitle" className="todo__title">
                  {todos.title}
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
        )}

        {todo.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {todo.filter(todos => !todos.completed).length} items left
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={cn('filter__link', {
                  selected: selected === FILTERS.all,
                })}
                data-cy="FilterLinkAll"
                onClick={() => setSelected(FILTERS.all)}
              >
                All
              </a>

              <a
                href="#/active"
                className={cn('filter__link', {
                  selected: selected === FILTERS.active,
                })}
                data-cy="FilterLinkActive"
                onClick={() => setSelected(FILTERS.active)}
              >
                Active
              </a>
              <a
                href="#/completed"
                className={cn('filter__link', {
                  selected: selected === FILTERS.completed,
                })}
                data-cy="FilterLinkCompleted"
                onClick={() => setSelected(FILTERS.completed)}
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
        className={`notification is-danger is-light has-text-weight-normal ${error ? '' : 'hidden'}`}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setError('')}
        />
        {error}
      </div>
    </div>
  );
};
