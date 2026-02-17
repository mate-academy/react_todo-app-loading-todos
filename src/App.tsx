/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Todo } from './types/Todo';
import classNames from 'classnames';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');
  const [status, setStatus] = useState<'All' | 'Active' | 'Completed'>('All');

  const filteredTodos = useCallback(
    (list: Todo[]) => {
      let result = [...list];

      if (status === 'Active') {
        result = result.filter(t => !t.completed);
      } else if (status === 'Completed') {
        result = result.filter(t => t.completed);
      }

      return result;
    },
    [status],
  );

  const visibleTodos = useMemo(() => {
    return filteredTodos(todos);
  }, [filteredTodos, todos]);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setError('Unable to load todos');
      });
  }, []);

  useEffect(() => {
    if (error !== '') {
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  }, [error]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const activeCount = todos.filter(todo => !todo.completed).length;
  const completedCount = todos.some(todo => todo.completed);

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

        {todos.length > 0 && (
          <>
            <section className="todoapp__main" data-cy="TodoList">
              {/* This is a completed todo */}
              {visibleTodos.map(todo => {
                return (
                  <div
                    data-cy="Todo"
                    className={classNames('todo', {
                      completed: todo.completed,
                    })}
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
                      {/* eslint-disable-next-line max-len */}
                      <div className="modal-background has-background-white-ter" />
                      <div className="loader" />
                    </div>
                  </div>
                );
              })}
            </section>
            <footer className="todoapp__footer" data-cy="Footer">
              <span className="todo-count" data-cy="TodosCounter">
                {`${activeCount} items left`}
              </span>

              {/* Active link should have the 'selected' class */}
              <nav className="filter" data-cy="Filter">
                <a
                  href="#/"
                  className={classNames('filter__link', {
                    selected: status === 'All',
                  })}
                  data-cy="FilterLinkAll"
                  onClick={() => setStatus('All')}
                >
                  All
                </a>

                <a
                  href="#/active"
                  className={classNames('filter__link', {
                    selected: status === 'Active',
                  })}
                  data-cy="FilterLinkActive"
                  onClick={() => setStatus('Active')}
                >
                  Active
                </a>

                <a
                  href="#/completed"
                  className={classNames('filter__link', {
                    selected: status === 'Completed',
                  })}
                  data-cy="FilterLinkCompleted"
                  onClick={() => setStatus('Completed')}
                >
                  Completed
                </a>
              </nav>

              {/* this button should be disabled if there are no completed todos */}
              <button
                type="button"
                className="todoapp__clear-completed"
                data-cy="ClearCompletedButton"
                disabled={!completedCount}
              >
                Clear completed
              </button>
            </footer>
          </>
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          {
            hidden: error === '',
          },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setError('')}
        />
        {/* show only one message at a time */}
        {error}
      </div>
    </div>
  );
};
