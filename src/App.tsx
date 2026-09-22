/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import cn from 'classnames';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { FilterStatus } from './types/FilterStatus';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [filter, setFilter] = useState<FilterStatus>(FilterStatus.all);

  function showErrorMessage(errorMessage: string) {
    setErrorMessages(currentErorrMessages => [
      ...currentErorrMessages,
      errorMessage,
    ]);

    setTimeout(() => {
      setErrorMessages(currentErorrMessages =>
        currentErorrMessages.filter(
          currentMessage => currentMessage !== errorMessage,
        ),
      );
    }, 3000);
  }

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        showErrorMessage('Unable to load todos');
      });
  }, []);

  const visibleTodos = useMemo(() => {
    return todos.filter(currentTodo => {
      if (filter === FilterStatus.active) {
        return !currentTodo.completed;
      }

      if (filter === FilterStatus.completed) {
        return currentTodo.completed;
      }

      return true;
    });
  }, [filter, todos]);

  const activeTodosCount = useMemo(() => {
    return todos.filter(currentTodo => currentTodo.completed === false).length;
  }, [todos]);

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

        <section className="todoapp__main" data-cy="TodoList">
          {visibleTodos.map(currentTodo => (
            <div
              data-cy="Todo"
              key={currentTodo.id}
              className={cn('todo', { completed: currentTodo.completed })}
            >
              <label className="todo__status-label">
                <input
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                  checked={currentTodo.completed}
                />
              </label>

              <span data-cy="TodoTitle" className="todo__title">
                {currentTodo.title}
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
        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {activeTodosCount} items left
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={cn('filter__link', {
                  selected: filter === FilterStatus.all,
                })}
                data-cy="FilterLinkAll"
                onClick={() => setFilter(FilterStatus.all)}
              >
                All
              </a>

              <a
                href="#/active"
                className={cn('filter__link', {
                  selected: filter === FilterStatus.active,
                })}
                data-cy="FilterLinkActive"
                onClick={() => setFilter(FilterStatus.active)}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={cn('filter__link', {
                  selected: filter === FilterStatus.completed,
                })}
                data-cy="FilterLinkCompleted"
                onClick={() => setFilter(FilterStatus.completed)}
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
        className={cn(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          { hidden: errorMessages.length === 0 },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessages([])}
        />
        {/* show only one message at a time */}
        {errorMessages.map((msg, index) => (
          <div key={index}>
            {msg}
            <br />
          </div>
        ))}
      </div>
    </div>
  );
};
