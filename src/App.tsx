/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { TodoItem } from './components/TodoItem';
import { Filter } from './components/Filter';
import { FilterBy } from './types/FilterBy';
import { getVisibleTodos } from './services/getVisibleTodos';

const USER_ID = 92;

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [query, setQuery] = useState<FilterBy>('all');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodosFromServer)
      .catch(() => {
        setErrorMessage('Error message');
      });

    setTimeout(() => {
      setErrorMessage('');
    }, 3000);

    return () => setErrorMessage('');
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const visibleTodos = getVisibleTodos(todosFromServer, query);
  const sumOfActiveTodos = todosFromServer.reduce((sum, todo) => {
    if (!todo.completed) {
      return sum + 1;
    }

    return sum;
  }, 0);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">
        todos
      </h1>

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

        {!!todosFromServer.length && (
          <section className="todoapp__main" data-cy="TodoList">
            {visibleTodos.map(todo => (
              <TodoItem todo={todo} key={todo.id} />
            ))}
          </section>
        )}

        {/* Hide the footer if there are no todos */}
        {!!todosFromServer.length && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${sumOfActiveTodos} items left`}
            </span>

            {/* Active filter should have a 'selected' class */}
            <Filter setQuery={setQuery} query={query} />

            {/* don't show this button if there are no completed todos */}
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

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !errorMessage },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage('')}
        />
        {/* show only one message at a time */}
        Unable to load todos
      </div>
    </div>
  );
};
