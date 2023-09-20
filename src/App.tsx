/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState, useMemo } from 'react';
import classNames from 'classnames';

import { Todo } from './types/Todo';
import { FilterTodos } from './types/FilterTodos';
import { getTodos } from './api/todos';
import { TodoList } from './components/TodoList';
import { TodoHeader } from './components/TodoHeader';
import { TodoFooter } from './components/TodoFooter';
import { ErrorType } from './types/ErrorMessage';

const USER_ID = 11500;

const getFilteredTodos = (
  todos: Todo[],
  selectedFilter: string,
) => {
  let preparedTodos = [...todos];

  if (selectedFilter !== FilterTodos.All) {
    preparedTodos = preparedTodos.filter(({ completed }) => {
      switch (selectedFilter) {
        case FilterTodos.Active:
          return !completed;

        case FilterTodos.Completed:
          return completed;

        default:
          return todos;
      }
    });
  }

  return preparedTodos;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterTodos, setFilterTodos] = useState<FilterTodos>(FilterTodos.All);
  const [haveError, setHaveError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(ErrorType.None);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setErrorMessage(ErrorType.LoadingError);
        setHaveError(true);
        setTimeout(() => {
          setHaveError(false);
        }, 3000);
        setTimeout(() => {
          setErrorMessage(ErrorType.None);
        }, 4000);
      });
  }, []);

  const filteredTodos = useMemo(() => {
    return getFilteredTodos(todos, filterTodos);
  }, [todos, filterTodos]);

  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const completedTodosCount = todos.filter(todo => todo.completed).length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">

        <TodoHeader
          activeTodosCount={activeTodosCount}
        />

        <TodoList todos={filteredTodos} />

        {!!todos.length && (
          <TodoFooter
            filter={filterTodos}
            setFilter={setFilterTodos}
            activeTodosCount={activeTodosCount}
            completedTodosCount={completedTodosCount}
          />
        )}
      </div>

      {errorMessage && (
        <div
          data-cy="ErrorNotification"
          className={classNames(
            'notification',
            'is-danger',
            'is-light',
            'has-text-weight-normal',
            { hidden: !haveError },
          )}
        >
          <button
            data-cy="HideErrorButton"
            type="button"
            className="delete"
            onClick={() => {
              setErrorMessage(ErrorType.None);
              setHaveError(false);
            }}
          />
          {errorMessage}
        </div>
      )}
    </div>
  );
};
