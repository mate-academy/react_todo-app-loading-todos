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

const USER_ID = 11509;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMesssage, setErrorMesssage] = useState('');
  const [selectedFilter, setSelectedFilter]
    = useState<FilterStatus>(FilterStatus.All);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch((error) => {
        setErrorMesssage('Unable to load todos');

        throw error;
      });

    const timerId = setInterval(() => {
      setErrorMesssage('');
    }, 3000);

    return () => {
      clearInterval(timerId);
    };
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
      {errorMesssage && (
        <div className={classNames(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          { hidden: !errorMesssage },
        )}
        >
          <button
            type="button"
            className="delete"
            onClick={() => setErrorMesssage('')}
          />
          {errorMesssage}
        </div>
      )}
    </div>
  );
};
