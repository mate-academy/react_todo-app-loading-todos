/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';

const USER_ID = 10329;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isWrongUrl, setIsWrongUrl] = useState(false);
  const [isAbleToAddTodo, setIsAbleToAddTodo] = useState(false);
  const [isAbleToDeleteTodo, setIsAbleToDeleteTodo] = useState(false);
  const [isAbleToUpdateTodo, setIsAbleToUpdateTodo] = useState(false);

  const [newTodo, setNewTodo] = useState('');
  const [allFilter, setAllFilter] = useState(true);
  const [activeFilter, setActiveFilter] = useState(false);
  const [completedFilter, setCompletedFilter] = useState(false);

  const hideNotifications = () => {
    setTimeout(() => {
      setIsWrongUrl(false);
    }, 3000);
  };

  const fetchTodos = async () => {
    try {
      const newTodos = await getTodos(USER_ID);

      setTodos(newTodos);
    } catch (error) {
      setIsWrongUrl(true);
      hideNotifications();
    }
  };

  useEffect(() => {
    fetchTodos();
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
              onChange={event => {
                setNewTodo(event.target.value);
              }}
              onKeyDown={event => {
                if (event.key === 'Enter') {
                  setIsWrongUrl(false);
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
              {todos.length}
              items left
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
      <div className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !isWrongUrl },
      )}
      >
        <button
          type="button"
          className="delete"
          onClick={() => setIsWrongUrl(false)}
        />

        Unable to show todos
      </div>

      <div className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !isAbleToAddTodo },
      )}
      >
        <button
          type="button"
          className="delete"
          onClick={() => setIsAbleToAddTodo(false)}
        />

        Unable to add a todo
      </div>

      <div className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !isAbleToDeleteTodo },
      )}
      >
        <button
          type="button"
          className="delete"
          onClick={() => setIsAbleToDeleteTodo(false)}
        />

        Unable to delete a todo
      </div>

      <div className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !isAbleToUpdateTodo },
      )}
      >
        <button
          type="button"
          className="delete"
          onClick={() => setIsAbleToUpdateTodo(false)}
        />

        Unable to update a todo
      </div>
    </div>
  );
};
