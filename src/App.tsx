/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { Status } from './types/Status';

const USER_ID = 11092;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const [selectItem, setSelectItem] = useState(Status.ALL);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch((error) => {
        setErrorMessage(true);
        throw error;
      });
  }, []);

  const isActiveTodos = todos.filter(todo => !todo.completed);

  const preparedTodos = todos
    ?.filter(todo => {
      const activeTodos = !todo.completed;
      const completedTodos = todo.completed;

      switch (selectItem) {
        case Status.ALL:
          return todos;

        case Status.ACTIVE:
          return activeTodos;

        case Status.COMPLETED:
          return completedTodos;

        default:
          throw new Error('Unable to add a todo');
      }
    });

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {isActiveTodos && (
            <button type="button" className="todoapp__toggle-all active" />
          )}

          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <section className="todoapp__main">
          {preparedTodos?.map(({ id, completed, title }) => {
            return (
              <div
                className={classNames('todo', {
                  completed,
                })}
                key={id}
              >
                <label className="todo__status-label">
                  <input
                    type="checkbox"
                    className="todo__status"
                    defaultChecked={completed}
                  />
                </label>

                <span className="todo__title">{title}</span>

                <button type="button" className="todo__remove">×</button>

                <div className="modal overlay">
                  <div className="modal-background has-background-white-ter" />
                  <div className="loader" />
                </div>
              </div>
            );
          })}
        </section>

        {todos?.length && (
          <footer className="todoapp__footer">
            <span className="todo-count">
              {`${isActiveTodos.length} items left`}
            </span>

            <nav className="filter">
              <a
                href="#/"
                className={classNames('filter__link', {
                  selected: selectItem === Status.ALL,
                })}
                onClick={() => setSelectItem(Status.ALL)}
              >
                All
              </a>

              <a
                href="#/active"
                className={classNames('filter__link', {
                  selected: selectItem === Status.ACTIVE,
                })}
                onClick={() => setSelectItem(Status.ACTIVE)}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={classNames('filter__link', {
                  selected: selectItem === Status.COMPLETED,
                })}
                onClick={() => setSelectItem(Status.COMPLETED)}
              >
                Completed
              </a>
            </nav>

            {!!todos.filter(todo => todo.completed).length && (
              <button
                type="button"
                className="todoapp__clear-completed"
              >
                Clear completed
              </button>
            )}
          </footer>
        )}

      </div>

      {errorMessage && (
        <div
          // eslint-disable-next-line max-len
          className={classNames('notification is-danger is-light has-text-weight-normal', {
            hidden: !errorMessage,
          })}
        >
          <button
            type="button"
            className="delete"
            onClick={() => setErrorMessage(false)}
          />
          Unable to load todos
        </div>
      )}
    </div>
  );
};
