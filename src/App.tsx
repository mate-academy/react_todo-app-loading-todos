/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';

// import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { FilterParam } from './utils/FilterParam';
import { TodoHeader } from './components/TodoHeader';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter';

const USER_ID = 11467;

export const App: React.FC = () => {
  const [filterParam, setFilterParam] = useState(FilterParam.All);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');
  // if (!USER_ID) {
  //   return <UserWarning />;
  // }

  const isOneTodoCompleted = useMemo(() => todos
    .some(({ completed }) => completed), [todos]);

  const filterTodos = useMemo(() => todos
    .filter(({ completed }) => {
      switch (filterParam) {
        case FilterParam.Active:
          return !completed;
        case FilterParam.Completed:
          return completed;
        default:
          return true;
      }
    }), [todos, filterParam]);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setError('Unable to download todos');
        setTimeout(() => setError(''), 3000);
      });
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />

        <TodoList todos={filterTodos} />

        {/* Hide the footer if there are no todos */}
        {todos.length && (
          <TodoFooter
            todos={filterTodos}
            isOneTodoCompleted={isOneTodoCompleted}
            filterParam={filterParam}
            setFilterParam={setFilterParam}
          />
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        className={classNames(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          {
            hidden: !error,
          },
        )}
      >
        <button
          type="button"
          className="delete"
          onClick={() => setError('')}
        />

        {error}

        {/* show only one message at a time */}
        {/* Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo */}
      </div>
    </div>
  );
};
