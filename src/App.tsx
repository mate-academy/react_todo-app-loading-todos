/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';

const FILTER_STATUS = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed',
} as const;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>(FILTER_STATUS.ALL);
  //const [query, setQuery] = useState('');
  const [isError, setIsError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let ignore = false;
    let timerErrorId: string | number | NodeJS.Timeout | undefined;

    const loadTodos = async () => {
      setIsLoading(true);

      try {
        const dataTodos = await getTodos();

        if (!ignore) {
          setTodos(dataTodos);
          setIsError(null);
        }
      } catch {
        if (ignore) {
          return;
        }

        setIsError('Unable to load todos');
        timerErrorId = setTimeout(() => setIsError(null), 3000);
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    loadTodos();

    return () => {
      ignore = true;
      clearTimeout(timerErrorId);
    };
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const getFilteredTodos = (filter_type: string) => {
    if (filter_type === FILTER_STATUS.ALL) {
      return todos;
    }

    const checkedFilterType = filter_type === FILTER_STATUS.ACTIVE;

    return todos.filter(todo => todo.completed !== checkedFilterType);
  };

  const counActiveTodos = todos.filter(todo => !todo.completed).length;

  const visibleTodos = getFilteredTodos(activeFilter);

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
          {
            //#region /*
            /* This is a completed todo
          <div data-cy="Todo" className="todo completed">
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
                checked
              />
            </label>

            <span data-cy="TodoTitle" className="todo__title">
              Completed Todo
            </span>


            /* Remove button appears only on hover
            <button type="button" className="todo__remove" data-cy="TodoDelete">
              ×
            </button>

            {/* overlay will cover the todo while it is being deleted or updated
            <div data-cy="TodoLoader" className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>

          /* This todo is an active todo
          <div data-cy="Todo" className="todo">
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
              />
            </label>

            <span data-cy="TodoTitle" className="todo__title">
              Not Completed Todo
            </span>
            <button type="button" className="todo__remove" data-cy="TodoDelete">
              ×
            </button>

            <div data-cy="TodoLoader" className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>

          /* This todo is being edited
          <div data-cy="Todo" className="todo">
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
              />
            </label>

            {/* This form is shown instead of the title and remove button
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
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>

           */
            //#endregion
          }
          {/*-------- rendering -----------*/}
          {visibleTodos.map(todo => (
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

              {/* 'is-active' class puts this modal on top of the todo */}
              <div
                data-cy="TodoLoader"
                className={cn('modal overlay', { 'is-active': isLoading })}
              >
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div>
          ))}
        </section>

        {/* Hide the footer if there are no todos */}
        {todos.length !== 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${counActiveTodos} items left`}
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={cn('filter__link', {
                  selected: activeFilter === FILTER_STATUS.ALL,
                })}
                data-cy="FilterLinkAll"
                onClick={e => {
                  e.preventDefault();
                  setActiveFilter(FILTER_STATUS.ALL);
                }}
              >
                All
              </a>

              <a
                href="#/active"
                className={cn('filter__link', {
                  selected: activeFilter === FILTER_STATUS.ACTIVE,
                })}
                data-cy="FilterLinkActive"
                onClick={e => {
                  e.preventDefault();
                  setActiveFilter(FILTER_STATUS.ACTIVE);
                }}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={cn('filter__link', {
                  selected: activeFilter === FILTER_STATUS.COMPLETED,
                })}
                data-cy="FilterLinkCompleted"
                onClick={e => {
                  e.preventDefault();
                  setActiveFilter(FILTER_STATUS.COMPLETED);
                }}
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
          { hidden: !isError },
        )}
      >
        <button data-cy="HideErrorButton" type="button" className="delete" />
        {/* show only one message at a time */}
        {isError}
        {/* <br />
        Title should not be empty
        <br />
        Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo */}
      </div>
    </div>
  );
};
