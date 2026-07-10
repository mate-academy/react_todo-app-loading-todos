/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import classNames from 'classnames';

enum SortType {
  all = 'all',
  Active = 'active',
  Completed = 'completed',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const [errorMessage, setErrorMessage] = useState('');
  const [sortType, setSortType] = useState<SortType>(SortType.all);

  useEffect(() => {
    setErrorMessage('');

    getTodos()
      .then(todosFromServer => setTodos(todosFromServer))
      .catch(() => {
        setErrorMessage('Unable to load todos');
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);

        throw new Error();
      });
  }, []);

  const filteredTodos = todos.filter(todo => {
    switch (sortType) {
      case SortType.Active: {
        return !todo.completed;
      }

      case SortType.Completed: {
        return todo.completed;
      }

      case SortType.all:
      default:
        return todo;
    }
  });

  const activeTodoCount = todos.filter(todo => !todo.completed).length;

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
              autoFocus
            />
          </form>
        </header>

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <>
            <section className="todoapp__main" data-cy="TodoList">
              {filteredTodos.map(todo => (
                <div
                  data-cy="Todo"
                  className={classNames(
                    `todo ${todo.completed ? `completed` : ``}`,
                  )}
                  key={todo.id}
                >
                  <label className="todo__status-label">
                    <input
                      data-cy="TodoStatus"
                      type="checkbox"
                      className="todo__status"
                      checked={todo.completed}
                      readOnly
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
                    {/* eslint-disable-next-line max-len */}
                    <div className="modal-background has-background-white-ter" />
                    <div className="loader" />
                  </div>
                </div>
              ))}
            </section>

            <footer className="todoapp__footer" data-cy="Footer">
              <span className="todo-count" data-cy="TodosCounter">
                {activeTodoCount} items left
              </span>

              {/* Active link should have the 'selected' class */}
              <nav className="filter" data-cy="Filter">
                <a
                  href="#/"
                  className={classNames(
                    `filter__link ${sortType === SortType.all ? 'selected' : ''}`,
                  )}
                  data-cy="FilterLinkAll"
                  onClick={() => {
                    setSortType(SortType.all);
                  }}
                >
                  All
                </a>

                <a
                  href="#/active"
                  className={classNames(
                    `filter__link ${sortType === SortType.Active ? 'selected' : ''}`,
                  )}
                  data-cy="FilterLinkActive"
                  onClick={() => {
                    setSortType(SortType.Active);
                  }}
                >
                  Active
                </a>

                <a
                  href="#/completed"
                  className={classNames(
                    `filter__link ${sortType === SortType.Completed ? 'selected' : ''}`,
                  )}
                  data-cy="FilterLinkCompleted"
                  onClick={() => {
                    setSortType(SortType.Completed);
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
          </>
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={classNames(
          `notification is-danger is-light has-text-weight-normal ${!errorMessage ? 'hidden' : ''}`,
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage('')}
        />
        {/* show only one message at a time */}
        {errorMessage}
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
