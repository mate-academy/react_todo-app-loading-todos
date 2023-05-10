/* eslint-disable jsx-a11y/control-has-associated-label */
// import { UserWarning } from './UserWarning';
// if (!USER_ID) {
//   return <UserWarning />;
// }

import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import { TodoList } from './components/TodoList';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Error } from './types/Error';
import { Filter } from './types/Filter';

const USER_ID = 10267;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<Error | null>(null);
  const [filter, setFilter] = useState<Filter>(Filter.ALL);

  const addError = (error: Error) => {
    setErrorMessage(error);
    window.setTimeout(() => {
      setErrorMessage(null);
    }, 3000);
  };

  useEffect(() => {
    const loadTodos = async () => {
      try {
        setErrorMessage(null);
        const todosFromServer = await getTodos(USER_ID);

        setTodos(todosFromServer);
      } catch (error) {
        addError(Error.LOAD);
      }
    };

    loadTodos();
  }, []);

  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case Filter.ACTIVE:
        return !todo.completed;
      case Filter.COMPLETED:
        return todo.completed;
      default:
        return true;
    }
  });

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
            />
          </form>
        </header>

        <TodoList todos={filteredTodos} />

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <footer className="todoapp__footer">
            <span className="todo-count">
              {`${todos.length} items left`}
            </span>

            {/* Active filter should have a 'selected' class */}
            <nav className="filter">
              <a
                href="#/"
                className={cn('filter__link', {
                  selected: filter === Filter.ALL,
                })}
                onClick={() => setFilter(Filter.ALL)}
              >
                All
              </a>

              <a
                href="#/active"
                className={cn('filter__link', {
                  selected: filter === Filter.ACTIVE,
                })}
                onClick={() => setFilter(Filter.ACTIVE)}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={cn('filter__link', {
                  selected: filter === Filter.COMPLETED,
                })}
                onClick={() => setFilter(Filter.COMPLETED)}
              >
                Completed
              </a>
            </nav>

            {/* don't show this button if there are no completed todos */}
            {filteredTodos.some((todo) => todo.completed) && (
              <button type="button" className="todoapp__clear-completed">
                Clear completed
              </button>
            )}
          </footer>
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      {errorMessage && (
        <div className="notification is-danger is-light has-text-weight-normal">
          <button
            type="button"
            className="delete"
            onClick={() => setErrorMessage(null)}
          />

          {`Unable to ${errorMessage} a todos`}
        </div>
      )}
    </div>
  );
};
