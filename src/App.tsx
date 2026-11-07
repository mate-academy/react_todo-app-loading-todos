/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import classNames from 'classnames';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>();
  const [todoLoadError, setTodoLoadError] = useState(false);
  const [filterStatus, setFilterStatus] = useState('All');

  const handleGetTodos = () => {
    setTodoLoadError(false);
    getTodos()
      .then(setTodos)
      .catch(() => {
        setTodoLoadError(true);
        setTimeout(() => {
          setTodoLoadError(false);
        }, 3000);
        throw new Error();
      });
  };

  const visibleTodos = todos?.filter(todo => {
    switch (filterStatus) {
      case 'All':
        return todo;

      case 'Active':
        return !todo.completed;

      case 'Completed':
        return todo.completed;

      default:
        return;
    }
  });

  const todosCounter = () => {
    const activeTodos = todos?.filter(todo => !todo.completed);

    return activeTodos?.length;
  };

  useEffect(() => {
    handleGetTodos();
  }, []);

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
            className={classNames({
              'todoapp_toggle-all': true,
              active: todos?.every(todo => todo.completed),
            })}
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

        <section className="todoapp__main" data-cy="TodoList">
          {/* This is a completed todo */}
          {visibleTodos?.map(todo => (
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
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div>
          ))}
        </section>

        {todos && todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${todosCounter()} items left`}
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={classNames('filter__link', {
                  selected: filterStatus === 'All',
                })}
                data-cy="FilterLinkAll"
                onClick={() => setFilterStatus('All')}
              >
                All
              </a>

              <a
                href="#/active"
                className={classNames('filter__link', {
                  selected: filterStatus === 'Active',
                })}
                data-cy="FilterLinkActive"
                onClick={() => setFilterStatus('Active')}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={classNames('filter__link', {
                  selected: filterStatus === 'Completed',
                })}
                data-cy="FilterLinkCompleted"
                onClick={() => setFilterStatus('Completed')}
              >
                Completed
              </a>
            </nav>

            {/* this button should be disabled if there are no completed todos */}
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={todos.every(todo => !todo.completed)}
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
        className={`notification is-danger is-light has-text-weight-normal ${!todoLoadError ? 'hidden' : ''}`}
      >
        <button data-cy="HideErrorButton" type="button" className="delete" />
        {/* show only one message at a time */}
        {todoLoadError && (
          <>
            Unable to load todos
            <br />
          </>
        )}
        {false && (
          <>
            Title should not be empty
            <br />
          </>
        )}
        {false && (
          <>
            Unable to add a todo
            <br />
          </>
        )}
        {false && (
          <>
            Unable to delete a todo
            <br />
          </>
        )}
        {false && (
          <>
            Unable to update a todo
            <br />
          </>
        )}
      </div>
    </div>
  );
};
