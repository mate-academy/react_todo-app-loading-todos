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
  const [errorMessage, setErrorMessage] = useState('');
  const [selectItem, setSelectItem] = useState(Status.ALL);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch((error) => {
        setErrorMessage('Error');
        throw error;
      });
  }, []);

  const isActiveTodos = todos?.filter(todo => !todo.completed);

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
          {/* this buttons is active only if there are some active todos */}
          {isActiveTodos && (
            <button type="button" className="todoapp__toggle-all active" />
          )}

          {/* Add a todo on form submit */}
          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <section className="todoapp__main">
          {preparedTodos?.map(todo => (
            <div className={classNames('todo', {
              completed: todo.completed,
            })}
            >
              <label className="todo__status-label">
                <input
                  type="checkbox"
                  className="todo__status"
                  defaultChecked={todo.completed}
                />
              </label>

              <span className="todo__title">{todo.title}</span>

              {/* Remove button appears only on hover */}
              <button type="button" className="todo__remove">×</button>

              {/* overlay will cover the todo while it is being updated */}
              <div className="modal overlay">
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div>
          ))}
        </section>

        {/* Hide the footer if there are no todos */}
        <footer className="todoapp__footer">
          {todos?.length && (
            <>
              <span className="todo-count">
                {`${isActiveTodos.length} items left`}
              </span>

              {/* Active filter should have a 'selected' class */}
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

              {/* don't show this button if there are no completed todos */}
              {isActiveTodos && (
                <button
                  type="button"
                  className="todoapp__clear-completed"
                >
                  Clear completed
                </button>
              )}
            </>
          )}
        </footer>
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      {errorMessage && (
        <div
          // eslint-disable-next-line max-len
          className={classNames('notification is-danger is-light has-text-weight-normal', {
            hidden: !errorMessage,
          })}
        >
          <button type="button" className="delete" />
        </div>
      )}

    </div>
  );
};
