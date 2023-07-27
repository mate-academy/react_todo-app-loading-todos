/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
// import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { ErrorType } from './types/Errors';
import { getTodos } from './api/todos';
import { FilterType } from './types/FilterType';
import { preparedTodos } from './utils/filterFunction';
import { TodoList } from './Components/TodoList';
import { TodoFooter } from './Components/TodoFooter';
import { TodoHeader } from './Components/TodoHeader';

const USER_ID = 11128;

export const App: React.FC = () => {
  // if (!USER_ID) {
  //   return <UserWarning />;
  // }

  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');
  const [filterType, setFilterType] = useState(FilterType.All);

  const visibleTodos = preparedTodos(todos, filterType);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setError(ErrorType.getData);
      });
  }, []);

  useEffect(() => {
    if (error) {
      const timeoutId = setTimeout(() => {
        setError('');
      }, 3000);

      return () => clearTimeout(timeoutId);
    }

    return () => {};
  }, [error]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">

        <TodoHeader todos={visibleTodos} />

        <TodoList visibleTodos={visibleTodos} />

        {visibleTodos.length >= 0
        && (
          <TodoFooter
            setFilterType={setFilterType}
            todos={visibleTodos}
            filterType={filterType}
          />
        )}

      </div>

      {/* Notification is shown in case of any error */}
      <div className={
        classNames('notification is-danger is-light has-text-weight-normal', {
          hidden: !error,
        })
      }
      >

        <button
          type="button"
          className="delete"
          onClick={() => setError('')}
        />

        {error}

      </div>
    </div>
  );
};
