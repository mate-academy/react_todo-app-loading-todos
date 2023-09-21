/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { getpreparedTodos } from './utils/PreparedTodos';
import { TodosFilter } from './types/TodoFilter';
import { TodoApp } from './components/TodoApp/TodoApp';
import { TodoFilter } from './components/TodoFilter/TodoFilter';

const USER_ID = 11528;

export const App: React.FC = () => {
  const [todos, setTodo] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<TodosFilter>(TodosFilter.All);
  const [errorMessage, setErrorMessage] = useState('');

  const activeTodosCount = todos
    .filter(({ completed }) => completed === false).length;

  const completedTodosCount = todos
    .filter(({ completed }) => completed === true).length;

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodo)
      .catch((error) => {
        setErrorMessage('Unable to load todos');
        // eslint-disable-next-line no-console
        console.warn(error);
      });
    const timerId = setTimeout(() => {
      setErrorMessage('');
    }, 4000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  const filteredTodos = useMemo((
  ) => getpreparedTodos(todos, filter), [todos, filter]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          {activeTodosCount && (
            <button
              type="button"
              className="todoapp__toggle-all active"
              data-cy="ToggleAllButton"
            />
          )}

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
          {/* This is a completed todo */}
          {filteredTodos.length > 0 ? (
            filteredTodos.map((todo) => (
              <TodoApp todo={todo} key={todo.id} />
            ))
          ) : (
            <p>No todos to display.</p>
          )}
        </section>

        {todos.length !== 0 && (
          <TodoFilter
            filter={filter}
            setFilter={setFilter}
            activeTodosCount={activeTodosCount}
            completedTodosCount={completedTodosCount}
          />
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          { hidden: !errorMessage },
        )}
      >
        <button
          type="button"
          data-cy="HideErrorButton"
          className="delete"
          onClick={() => setErrorMessage('')}
        />

        {/* show only one message at a time */}
        {errorMessage}
      </div>
    </div>
  );
};
