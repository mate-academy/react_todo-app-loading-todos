/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { FilterTodos } from './types/FilterTodos';

const USER_ID = 11544;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosError, setTodosError] = useState('');
  const [filtredTodos, setFiltredTodos] = useState(FilterTodos.All);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch((error) => {
        setTodosError('Unable to download todos');
        throw error;
      });
  }, []);

  useEffect(() => {
    if (todosError) {
      const timeoutId = setTimeout(() => {
        setTodosError('');
      }, 3000);

      return () => {
        clearTimeout(timeoutId);
      };
    }

    return undefined;
  }, [todosError]);

  const red = () => {
    const filteredData = todos.filter(todo => {
      switch (filtredTodos) {
        case FilterTodos.Active:
          return !todo.completed;
        case FilterTodos.Complited:
          return todo.completed;
        default:
          return true;
      }
    });

    setTodos(filteredData);
  };

  useEffect(() => {
    red();
  }, [filtredTodos]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
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
        {!todos.length ? (
          <div data-cy="TodoLoader" className="modal overlay">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        ) : (
          <>
            <section className="todoapp__main" data-cy="TodoList">

              {/* This is a completed todo */}
              {todos.map(todo => (
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

                  {/* overlay will cover the todo while it is being updated */}

                </div>
              ))}
              {/* This todo is not completed */}
              {/* <div data-cy="Todo" className="todo">
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
              </div> */}

              {/* This todo is being edited */}
              {/* <div data-cy="Todo" className="todo">
                <label className="todo__status-label">
                  <input
                    data-cy="TodoStatus"
                    type="checkbox"
                    className="todo__status"
                  />
                </label>
 */}
              {/* This form is shown instead of the title and remove button */}
              {/* <form>
                  <input
                    data-cy="TodoTitleField"
                    type="text"
                    className="todo__title-field"
                    placeholder="Empty todo will be deleted"
                    value="Todo is being edited now"
                  />
                </form> */}

              {/* <div data-cy="TodoLoader" className="modal overlay">
                  <div className="modal-background has-background-white-ter" />
                  <div className="loader" />
                </div>
              </div> */}

              {/* This todo is in loadind state */}
              {/* <div data-cy="Todo" className="todo">
                <label className="todo__status-label">
                  <input
                    data-cy="TodoStatus"
                    type="checkbox"
                    className="todo__status"
                  />
                </label>

                <span data-cy="TodoTitle" className="todo__title">
                  Todo is being saved now
                </span>

                <button
                  type="button"
                  className="todo__remove"
                  data-cy="TodoDelete"
                >
                  ×
                </button>
 */}
              {/* 'is-active' class puts this modal on top of the todo */}
              {/* <div data-cy="TodoLoader" className="modal overlay is-active">
                  <div className="modal-background has-background-white-ter" />
                  <div className="loader" />
                </div>
              </div> */}

            </section>
            <footer className="todoapp__footer" data-cy="Footer">
              <span className="todo-count" data-cy="TodosCounter">
                3 items left
              </span>

              {/* Active filter should have a 'selected' class */}
              <nav className="filter" data-cy="Filter">
                <a
                  href="#/"
                  className="filter__link selected"
                  data-cy="FilterLinkAll"
                  onClick={() => setFiltredTodos(FilterTodos.All)}
                >
                  All
                </a>

                <a
                  href="#/active"
                  className="filter__link"
                  data-cy="FilterLinkActive"
                  onClick={() => setFiltredTodos(FilterTodos.Active)}
                >
                  Active
                </a>

                <a
                  href="#/completed"
                  className="filter__link"
                  data-cy="FilterLinkCompleted"
                  onClick={() => setFiltredTodos(FilterTodos.Complited)}
                >
                  Completed
                </a>
              </nav>

              {/* don't show this button if there are no completed todos */}
              <button
                type="button"
                className="todoapp__clear-completed"
                data-cy="ClearCompletedButton"
              >
                Clear completed
              </button>
            </footer>
          </>

        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      {todosError && (
        <div className={classNames(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          {
            hidden: !!todosError,
          },
        )}
        >
          <button
            data-cy="HideErrorButton"
            type="button"
            className="delete"
            onClick={() => setTodosError('')}
          />
          {/* show only one message at a time */}
          {todosError}
          <br />
          Title should not be empty
          <br />
          Unable to add a todo
          <br />
          Unable to delete a todo
          <br />
          Unable to update a todo
        </div>
      )}
    </div>
  );
};
