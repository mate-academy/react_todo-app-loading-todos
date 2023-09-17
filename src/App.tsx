/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { ActiveFilter } from './types/ActiveFilter';
import { client } from './utils/fetchClient';
import { TodoItem } from './components/TodoItem';
import { Filter } from './components/Filter';

const USER_ID = 11382;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [activeFilter, setActiveFilter]
    = useState<ActiveFilter>(ActiveFilter.All);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const filteredTodos = todos.filter(todo => {
    switch (activeFilter) {
      case ActiveFilter.Active:
        return !todo.completed;

      case ActiveFilter.Completed:
        return todo.completed;

      case ActiveFilter.All:
      default:
        return true;
    }
  });

  const completedTodosCount = todos.reduce((acc, todo) => {
    return todo.completed ? acc + 1 : acc;
  }, 0);

  const activeTodosCount = todos.length - completedTodosCount;

  useEffect(() => {
    let timeoutID = 0;

    setHasError(false);

    client.get<Todo[]>(`/todos?userId=${USER_ID}`)
      .then(setTodos)
      .catch(() => {
        setHasError(true);
        setErrorMessage('Unable to load todos');
        timeoutID = window.setTimeout(() => {
          setHasError(false);
        }, 3000);
      });

    return () => window.clearTimeout(timeoutID);
  }, [activeFilter]);

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
            className={classNames('todoapp__toggle-all active', {
              active: completedTodosCount !== 0,
            })}
          />

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
          {filteredTodos.map(todo => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </section>

        {/* Hide the footer if there are no todos */}
        {/* {todos.length > 0 && ( */}
        <footer className="todoapp__footer">
          <span className="todo-count">
            {`${activeTodosCount} items left`}
          </span>

          <Filter
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
          />

          {/* don't show this button if there are no completed todos */}
          <button
            type="button"
            className={classNames('todoapp__clear-completed', {
              'todoapp__clear-completed--hidden': completedTodosCount === 0,
            })}
          >
            Clear completed
          </button>
        </footer>
        {/* )} */}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !hasError },
        )}
      >
        <button
          type="button"
          className="delete"
          onClick={() => setHasError(false)}
        />

        {errorMessage}
      </div>
    </div>
  );
};
