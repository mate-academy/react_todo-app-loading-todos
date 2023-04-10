/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState, useMemo } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { Todo, StatusToFilter } from './types/Todo';
import { getTodos } from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { TodoFilter } from './components/TodoFilter/TodoFilter';
import { getFilteredTodos } from './helper/GetFilteredTodos';
import { Loader } from './components/Loader/Loader';

const USER_ID = 7009;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorDescription, setErrorDescription] = useState('');
  const [isListLoading, setIsListLoading] = useState(true);
  const [statusToFilter, setStatusToFilter] = useState(StatusToFilter.All);
  const [amountOfActiveTodos, amoutOfCompletedTodos] = useMemo(
    () => [
      todos.filter(({ completed }) => !completed).length,
      todos.filter(({ completed }) => completed).length,
    ],
    [todos],
  );

  const getTodosFromServer = async () => {
    try {
      const todosFromServer = await getTodos(USER_ID);

      setTodos(todosFromServer);
    } catch {
      setErrorDescription('An error occured while todos loading');
    } finally {
      setIsListLoading(false);
    }
  };

  useEffect(() => {
    setErrorDescription('');
    getTodosFromServer();
    setTimeout(() => setErrorDescription(''), 3000);
  }, []);

  const visibleTodos = getFilteredTodos(statusToFilter, todos);

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

          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <section className="todoapp__main">
          {isListLoading
            ? <Loader />
            : <TodoList todos={visibleTodos} />}
        </section>

        {todos && (
          <TodoFilter
            statusToFilter={statusToFilter}
            setStatusToFilter={setStatusToFilter}
            amountOfActiveTodos={amountOfActiveTodos}
            amoutOfCompletedTodos={amoutOfCompletedTodos}
          />
        )}
      </div>

      <div
        className={classNames(
          'notification',
          'is-danger',
          'has-text-weight-normal',
          'is-light',
          {
            hidden: !errorDescription,
          },
        )}
      >
        <button
          type="button"
          className="delete"
          onClick={() => setErrorDescription('')}
        />
        {errorDescription}
      </div>
    </div>
  );
};
