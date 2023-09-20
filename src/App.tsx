/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { FilterStatus } from './types/FilterStatus';
import { TodoFilter } from './components/TodoFilter/TodoFilter';
import { getFilteredTodos } from './utils/filterTodos';
import { TodoHeader } from './components/TodoHeader/TodoHeder';

const USER_ID = 11509;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMesssage, setErrorMesssage] = useState('');
  const [selectedFilter, setSelectedFilter]
= useState<FilterStatus>(FilterStatus.All);

  useEffect(() => {
    setErrorMesssage('');

    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setErrorMesssage('Unable to load todos');

        setTimeout(() => {
          setErrorMesssage('');
        }, 3000);
      });
  }, []);

  const filteredTodos = useMemo(() => {
    return getFilteredTodos(todos, selectedFilter);
  }, [todos, selectedFilter]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader todos={filteredTodos} />

        {filteredTodos.length > 0 && (
          <TodoList todos={filteredTodos} />
        )}

        {filteredTodos.length > 0 && (
          <TodoFilter
            todos={todos}
            selectedFilter={selectedFilter}
            onSelectedFilter={setSelectedFilter}
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
          { hidden: !errorMesssage },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMesssage('')}
        />
        {errorMesssage}
      </div>
    </div>
  );
};
