/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect, useMemo } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { TodoList } from './components/TodoList';
import { Loader } from './components/Loader/Loader';
import { TodoFilter } from './components/Todofilter';
import { FilterType } from './types/FilterType';
import { getFilteredTodos } from './utils/GetTodosFiltered';

const USER_ID = 6981;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isListLoading, setListLoading] = useState(false);
  const [filterType, setFilterType] = useState(FilterType.All);
  const [activeTodos] = useMemo(
    () => [
      todos.filter(({ completed }) => !completed).length,
    ],
    [todos],
  );
  const [errorMessage, setErrorMessage] = useState('');

  async function getTodosFromServer() {
    setListLoading(true);
    try {
      const todosFromServer = await getTodos(USER_ID);

      setTodos(todosFromServer);
    } catch (error) {
      setErrorMessage('Unable to load todos!');
    }

    setListLoading(false);
  }

  useEffect(() => {
    setErrorMessage('');
    getTodosFromServer();
    setTimeout(() => setErrorMessage(''), 3000);
  }, []);

  const visibleTodos = getFilteredTodos(filterType, todos);

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
            />
          </form>
        </header>

        <section className="todoapp__main">
          {isListLoading ? (
            <Loader />
          ) : (todos.length > 0 && (
            <TodoList todos={visibleTodos} />
          ))}
        </section>

        {todos && (
          <TodoFilter
            filterType={filterType}
            onFilterChange={setFilterType}
            todosLeftActive={activeTodos}
          />
        )}
      </div>
      <div
        className={classNames(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          {
            hidden: !errorMessage,
          },
        )}
      >
        <button
          type="button"
          className="delete"
          onClick={() => setErrorMessage('')}
        />
        {errorMessage}
      </div>
    </div>
  );
};
