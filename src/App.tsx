/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { client } from './utils/fetchClient';
import classNames from 'classnames';

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  // const [isLoading, setIsLoading] = useState(false);
  const [loadTodosError, setLoadTodosError] = useState('');
  const [titleError, setTitleError] = useState('');
  const [addTodosError, setAddTodosError] = useState('');
  const [updateTodosError, setUpdateTodosError] = useState('');
  const [deleteTodosError, setDeleteTodosError] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('All');
  const [errorTimerId, setErrorTimerId] = useState<number | null>(null);

  const error =
    loadTodosError ||
    titleError ||
    addTodosError ||
    updateTodosError ||
    deleteTodosError;

  const visibleTodos = (todos || []).filter(todo => {
    switch (filterStatus) {
      case 'Active':
        return !todo.completed;
      case 'Completed':
        return todo.completed;
      case 'All':
      default:
        return true;
    }
  });

  const activeCount = todos.filter(todo => !todo.completed).length;
  const hasCompleted = todos.some(todo => todo.completed);

  // function addTodo(e: HTMLInputElement) {
  //   setTitle(e.target.value);

  //   const newId = Math.max(todos.map(todo => todo.id)) + 1;

  //   const newTodo = {
  //     id: newId,
  //     userId: userId,
  //     title: title,
  //     completed: false,
  //   };

  //   setTodos(currentTodos => [...currentTodos, newTodo]);
  // }

  useEffect(() => {
    const loadTodos = async () => {
      setIsAppLoading(true);
      setLoadTodosError('');

      try {
        const fetchedTodos = await client.get<Todo[]>(
          `/todos?userId=${USER_ID}`,
        );

        setTodos(fetchedTodos);
      } catch (err) {
        setLoadTodosError('Unable to load todos');
      } finally {
        setIsAppLoading(false);
      }
    };

    loadTodos();
  }, []);

  const hideError = () => {
    setLoadTodosError('');
    setTitleError('');
    setAddTodosError('');
    setDeleteTodosError('');
    setUpdateTodosError('');
  };

  useEffect(() => {
    if (error) {
      if (errorTimerId !== null) {
        clearTimeout(errorTimerId);
      }

      const newTimerId = setTimeout(() => {
        hideError();
      }, 3000) as unknown as number;

      setErrorTimerId(newTimerId);
    }

    return () => {
      if (errorTimerId !== null) {
        clearTimeout(errorTimerId);
      }
    };
  }, [error, errorTimerId]);

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
            className={classNames('todoapp__toggle-all', {
              active: todos.length > 0 && activeCount === 0,
            })}
            data-cy="ToggleAllButton"
            disabled={isAppLoading}
          />

          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={title}
              onChange={e => setTitle(e.target.value)}
              disabled={isAppLoading}
            />
          </form>
        </header>

        {isAppLoading && (
          <p className="notification is-info is-light">Loading todos...</p>
        )}

        <section className="todoapp__main" data-cy="TodoList">
          {todos.length > 0 && (
            <ul className="todo-list">
              {visibleTodos.map(todo => (
                <div
                  data-cy="Todo"
                  key={todo.id}
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
                  <div
                    data-cy="TodoLoader"
                    className={classNames('modal overlay', {
                      'is-active': false,
                    })}
                  >
                    <div
                      className={classNames(
                        'modal-background',
                        'has-background-white-ter',
                      )}
                    />
                    <div className="loader" />
                  </div>
                </div>
              ))}
            </ul>
          )}
        </section>

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {activeCount} items left
            </span>

            <nav className="filter" data-cy="Filter">
              {['All', 'Active', 'Completed'].map(status => (
                <a
                  key={status}
                  href={`#/${status.toLowerCase()}`}
                  className={classNames('filter__link', {
                    selected: filterStatus === status,
                  })}
                  data-cy={`FilterLink${status}`}
                  onClick={() => setFilterStatus(status)}
                >
                  {status}
                </a>
              ))}
            </nav>

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={!hasCompleted}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        // FIX 17: Use conditional class to hide/show the notification
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          {
            hidden: !error,
          },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={hideError}
        />

        {error && <p>{error}</p>}
      </div>
    </div>
  );
};
