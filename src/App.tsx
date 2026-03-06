/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import classNames from 'classnames';

type Errors = 'upload' | 'title' | 'add' | 'delete' | 'update' | '';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>();
  const [loadTodos, setLoadTodos] = useState<boolean>(false);
  const [hasError, setHasError] = useState<Errors>('');
  const [filter, setFilter] = useState<'All' | 'Completed' | 'Active'>('All');
  const [completedTodos, setCompletedTodos] = useState<Todo[]>();
  const [allTodosCount, setAllTodosCount] = useState<number>(0);

  useEffect(() => {
    setLoadTodos(true);
    setHasError('');
    setCompletedTodos([]);

    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    getTodos()
      .then(data => {
        setAllTodosCount(data.length);

        const filteredData = data.filter(todo => {
          switch (filter) {
            case 'Completed':
              return todo.completed === true;
            case 'Active':
              return todo.completed === false;
            case 'All':
            default:
              return todo;
          }
        });

        const finishedTodos: Todo[] = data.filter(todo => todo.completed);

        setCompletedTodos(finishedTodos);

        setTodos(filteredData);
      })
      .catch(error => {
        setHasError('upload');
        throw error;
      })
      .finally(() => {
        setLoadTodos(false);
        timeoutId = setTimeout(() => {
          setHasError('');
        }, 3000);
      });

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [filter]);

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
            className={classNames(
              'todoapp__toggle-all',
              allTodosCount === completedTodos?.length ? 'active' : '',
            )}
            data-cy="ToggleAllButton"
            disabled={loadTodos}
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

        <section
          className={classNames(
            'todoapp__main',
            todos?.length === 0 ? 'hidden' : '',
          )}
          data-cy="TodoList"
        >
          {todos?.map(todo => (
            <div
              data-cy="Todo"
              className={classNames('todo', todo.completed ? 'completed' : '')}
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
                disabled={loadTodos}
              >
                ×
              </button>

              {/* overlay will cover the todo while it is being deleted or updated */}
              <div
                data-cy="TodoLoader"
                className={classNames(
                  'modal overlay',
                  loadTodos ? '' : 'hidden',
                )}
              >
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div>
          ))}
        </section>

        {/* Hide the footer if there are no todos */}
        {allTodosCount !== 0 && (
          <footer
            className={classNames(
              'todoapp__footer',
              allTodosCount === 0 ? 'hidden' : '',
            )}
            data-cy="Footer"
          >
            <span className="todo-count" data-cy="TodosCounter">
              {allTodosCount - (completedTodos?.length ?? 0)} items left
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={classNames(
                  'filter__link',
                  filter === 'All' ? 'selected' : '',
                )}
                data-cy="FilterLinkAll"
                onClick={() => setFilter('All')}
              >
                All
              </a>

              <a
                href="#/active"
                className={classNames(
                  'filter__link',
                  filter === 'Active' ? 'selected' : '',
                )}
                data-cy="FilterLinkActive"
                onClick={() => setFilter('Active')}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={classNames(
                  'filter__link',
                  filter === 'Completed' ? 'selected' : '',
                )}
                data-cy="FilterLinkCompleted"
                onClick={() => setFilter('Completed')}
              >
                Completed
              </a>
            </nav>

            {/* this button should be disabled if there are no completed todos */}
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={loadTodos}
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
          'notification is-danger is-light has-text-weight-normal',
          hasError ? '' : 'hidden',
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setHasError('')}
          disabled={loadTodos}
        />
        {/* show only one message at a time */}
        <div className={classNames('notification', { hidden: !hasError })}>
          {hasError === 'upload'
            ? 'Unable to load todos'
            : hasError === 'add'
              ? 'Unable to add a todo'
              : hasError === 'title'
                ? 'Title should not be empty'
                : hasError === 'delete'
                  ? 'Unable to delete a todo'
                  : hasError === 'update'
                    ? 'Unable to update a todo'
                    : ''}
        </div>
        {/* <div className={classNames(hasError === 'upload' ? '' : 'hidden')}>
          Unable to load todos
        </div>
        <div className={classNames(hasError === 'title' ? '' : 'hidden')}>
          <br />
          Title should not be empty
        </div>
        <div className={classNames(hasError === 'add' ? '' : 'hidden')}>
          <br />
          Unable to add a todo
        </div>
        <div className={classNames(hasError === 'delete' ? '' : 'hidden')}>
          <br />
          Unable to delete a todo
        </div>
        <div className={classNames(hasError === 'update' ? '' : 'hidden')}>
          <br />
          Unable to update a todo
        </div> */}
      </div>
    </div>
  );
};
