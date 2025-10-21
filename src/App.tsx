/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import cn from 'classnames';

const Filters = {
  all: 'all',
  completed: 'completed',
  active: 'active',
};

export const App: React.FC = () => {
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [hasFooter, setHasFooter] = useState(false);
  const [todosCounter, setTodosCounter] = useState(0);
  const [activeFilter, setActiveFilter] = useState(Filters.all);

  const clearErrorMessage = () => {
    setErrorMessage('');
  };

  useEffect(() => {
    setHasFooter(false);
    clearErrorMessage();
    getTodos()
      .then(response => {
        setAllTodos(response);
        setFilteredTodos(response);

        if (response.length > 0) {
          setHasFooter(true);
          setTodosCounter(
            response.filter(todo => todo.completed === false).length,
          );
        }
      })
      .catch(error => {
        setErrorMessage('Unable to load todos');
        throw error;
      });
  }, []);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        clearErrorMessage();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const handleFiltering = (filter: string) => {
    switch (filter) {
      case Filters.all:
        setFilteredTodos(allTodos);
        setActiveFilter(Filters.all);
        break;
      case Filters.active:
        setFilteredTodos(allTodos.filter(todo => !todo.completed));
        setActiveFilter(Filters.active);

        break;
      case Filters.completed:
        setFilteredTodos(allTodos.filter(todo => todo.completed));
        setActiveFilter(Filters.completed);
        break;
      default:
        break;
    }
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  const handleClearingError = () => {
    setErrorMessage('');
  };
  // const handleSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {

  // }

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
              // onSubmit={}
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {filteredTodos.map(todo => (
            <div
              data-cy="Todo"
              className={cn('todo', { completed: todo.completed })}
              key={todo.id}
            >
              <label className="todo__status-label">
                <input
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                  checked={todo.completed}
                  // onClick={}
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
        {hasFooter && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${todosCounter} items left`}
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={cn('filter__link', {
                  selected: activeFilter === Filters.all,
                })}
                data-cy="FilterLinkAll"
                onClick={() => handleFiltering(Filters.all)}
              >
                All
              </a>

              <a
                href="#/active"
                className={cn('filter__link', {
                  selected: activeFilter === Filters.active,
                })}
                data-cy="FilterLinkActive"
                onClick={() => handleFiltering(Filters.active)}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={cn('filter__link', {
                  selected: activeFilter === Filters.completed,
                })}
                data-cy="FilterLinkCompleted"
                onClick={() => handleFiltering(Filters.completed)}
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
          'notification is-danger is-light has-text-weight-normal',
          { hidden: errorMessage === '' },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={handleClearingError}
        />
        {errorMessage}
      </div>
    </div>
  );
};
