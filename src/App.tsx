/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Todo } from './types/Todo';
import classNames from 'classnames';

type ErrorMessage = 'LOAD' | 'TITLE' | 'ADD' | 'DELETE' | 'UPDATE' | null;
type SortTodos = 'All' | 'Active' | 'Completed';

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);

  const [error, setError] = useState<ErrorMessage>(null);
  const [sortTodos, setSortTodos] = useState<SortTodos>('All');

  function sorterTodos(todos: Todo[], sortStatus: SortTodos) {
    switch (sortStatus) {
      case 'Active':
        return todos.filter((t: Todo) => !t.completed);
      case 'Completed':
        return todos.filter((t: Todo) => t.completed);
      default:
        return todos;
    }
  }

  useEffect(() => {
    getTodos()
      .then(setTodosFromServer)
      .catch(() => setError('LOAD'))
      .finally();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setError(null);
    }, 3000);
  }, [error]);

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
              // ref={inputRef}
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              autoFocus
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {sorterTodos(todosFromServer, sortTodos).map(todo => {
            return (
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
                <button
                  type="button"
                  className="todo__remove"
                  data-cy="TodoDelete"
                >
                  ×
                </button>

                <div data-cy="TodoLoader" className="modal overlay">
                  <div className="modal-background has-background-white-ter" />
                  <div className="loader" />
                </div>
              </div>
            );
          })}
        </section>

        {/* Hide the footer if there are no todos */}
        {todosFromServer.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${todosFromServer.filter(t => !t.completed).length} items left`}
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={classNames('filter__link', {
                  selected: sortTodos === 'All',
                })}
                data-cy="FilterLinkAll"
                onClick={() => setSortTodos('All')}
              >
                All
              </a>

              <a
                href="#/active"
                className={classNames('filter__link', {
                  selected: sortTodos === 'Active',
                })}
                data-cy="FilterLinkActive"
                onClick={() => setSortTodos('Active')}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={classNames('filter__link', {
                  selected: sortTodos === 'Completed',
                })}
                data-cy="FilterLinkCompleted"
                onClick={() => setSortTodos('Completed')}
              >
                Completed
              </a>
            </nav>

            {/* this button should be disabled if there are no completed todos */}
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={!todosFromServer.some(t => t.completed)}
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
          { hidden: error === null },
        )}
      >
        <button data-cy="HideErrorButton" type="button" className="delete" />
        {/* show only one message at a time */}
        {error === 'LOAD' && (
          <>
            Unable to load todos
            <br />
          </>
        )}
        {error === 'TITLE' && (
          <>
            Title should not be empty
            <br />
          </>
        )}
        {error === 'ADD' && (
          <>
            Unable to add a todo
            <br />
          </>
        )}
        {error === 'DELETE' && (
          <>
            Unable to delete a todo
            <br />
          </>
        )}
        {error === 'UPDATE' && (
          <>
            Unable to update a todo
            <br />
          </>
        )}
      </div>
    </div>
  );
};
