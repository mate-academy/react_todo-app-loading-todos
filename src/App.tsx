/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState, useMemo } from 'react';
import classNames from 'classnames';

import { Todo } from './types/Todo';
import { TodoFilter } from './types/TodoFilter';
import { getTodos } from './api/todos';
import { TodoList } from './components/TodoList';
import { TodoHeader } from './components/TodoHeader';
import { TodoFooter } from './components/TodoFooter';
import { getFilteredTodos } from './utils/getFilteredTodos';
import { CurrentError } from './types/CurrentError';

const USER_ID = 11522;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoFilter, setTodoFilter] = useState<TodoFilter>(TodoFilter.All);
  const [errorMessage, setErrorMessage] = useState(CurrentError.Default);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setErrorMessage(CurrentError.LoadingError);
      });
  }, []);

  const filteredTodos = useMemo(() => {
    return getFilteredTodos(todos, todoFilter);
  }, [todos, todoFilter]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />

        <TodoList todos={filteredTodos} />

        {!!todos.length && (
          <TodoFooter
            todos={filteredTodos}
            filter={todoFilter}
            setFilter={setTodoFilter}
          />
        )}
      </div>

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
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage(CurrentError.Default)}
        />
        {errorMessage}
      </div>
    </div>
  );
};
