/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';

import { UserWarning } from './UserWarning';
import { TodoFilter } from './components/TodoFilter';
import { TodoList } from './components/TodoList/TodoList';
import { Todo as TodoType } from './types/Todo';

import { getTodos } from './api/todos';
import { Header } from './components/Header';
import { FilterType } from './enums/FilterType';
import { getFilteredTodos } from './utils/getFilteredTodos';

const USER_ID = 6712;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [filterType, setFilterType] = useState(FilterType.All);
  const [errorMessage, setErrorMessage] = useState('');

  const [activeTodosCount, completedTodosCount] = useMemo(
    () => [
      todos.filter(({ completed }) => !completed).length,
      todos.filter(({ completed }) => completed).length,
    ],
    [todos],
  );

  useEffect(() => {
    setErrorMessage('');
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos!');
        setTimeout(() => setErrorMessage(''), 3000);
      });
  }, []);

  const visibleTodos = useMemo(() => {
    return getFilteredTodos(todos, filterType);
  }, [todos, filterType]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header isAnyActiveTodos={activeTodosCount > 0} />

        <TodoList todos={visibleTodos} />

        {todos.length > 0 && (
          <TodoFilter
            filterType={filterType}
            changeFilterType={setFilterType}
            todosLeft={activeTodosCount}
            completedTodosCount={completedTodosCount}
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
