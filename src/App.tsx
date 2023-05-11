/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';

import { Todo } from './types/Todo';

import { getTodos } from './api/todos';

const USER_ID = 10329;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [hidden, setHidden] = useState(false);
  const [newTodo, setNewTodo] = useState('');
  const [allFilter, setAllFilter] = useState(true);
  const [activeFilter, setActiveFilter] = useState(false);
  const [completedFilter, setCompletedFilter] = useState(false);

  const fetchTodos = async () => {
    const newTodos = await getTodos(USER_ID);

    setTodos(newTodos);
  };

  const hideNotifications = () => {
    setTimeout(() => {
      setHidden(true);
    }, 3000);
  };

  useEffect(() => {
    fetchTodos();
    hideNotifications();
  }, []);

  let visibleTodos: Todo[] = JSON.parse(JSON.stringify(todos));

  if (activeFilter) {
    visibleTodos = visibleTodos.filter(todo => !todo.completed);
  }

  if (completedFilter) {
    visibleTodos = visibleTodos.filter(todo => todo.completed);
  }

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          <button type="button" className="todoapp__toggle-all active" />

          {/* Add a todo on form submit */}
          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={newTodo}
              onChange={(event) => {
                setNewTodo(event.target.value);
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  setHidden(true);
                }
              }}
            />
          </form>
        </header>

        <section className="todoapp__main">
          {visibleTodos.map(todo => {
            return (
              <div
                className={classNames(
                  'todo',
                  { completed: todo.completed },
                )}
              >
                <label className="todo__status-label">
                  <input
                    type="checkbox"
                    className="todo__status"
                    checked
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
            );
          })}
        </section>

        {todos.length > 0 && (
          <footer className="todoapp__footer">
            <span className="todo-count">
              3 items left
            </span>

            {/* Active filter should have a 'selected' class */}
            <nav className="filter">
              <a
                href="#/"
                className={classNames('filter__link',
                  { selected: allFilter })}
                onClick={() => {
                  setAllFilter(true);
                  setActiveFilter(false);
                  setCompletedFilter(false);
                }}
              >
                All
              </a>

              <a
                href="#/active"
                className={classNames('filter__link',
                  { selected: activeFilter })}
                onClick={() => {
                  setAllFilter(false);
                  setActiveFilter(true);
                  setCompletedFilter(false);
                }}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={classNames('filter__link',
                  { selected: completedFilter })}
                onClick={() => {
                  setAllFilter(false);
                  setActiveFilter(false);
                  setCompletedFilter(true);
                }}
              >
                Completed
              </a>
            </nav>

            {/* don't show this button if there are no completed todos */}
            <button type="button" className="todoapp__clear-completed">
              Clear completed
            </button>
          </footer>
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: hidden }, // eslint-disable-line
        )}
      >
        <button
          type="button"
          className="delete"
          onClick={() => setHidden(true)}
        />

        {/* show only one message at a time */}
        Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo
      </div>
    </div>
  );
};
