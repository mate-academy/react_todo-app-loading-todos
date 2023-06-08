/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect, useMemo } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { TodoFooter } from './components/TodoFooter/TodoFooter';
import { TodoList } from './components/TodoList/TodoList';
import { TodoHeader } from './components/TodoHeader/TodoHeader';

const USER_ID = 10631;

export const filterOptions = ['All', 'Active', 'Completed'];

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [filter, setFilter] = useState(filterOptions[0]);
  const [isError, setIsError] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const loadTodos = async () => {
    setIsError(false);
    try {
      const todos = await getTodos(USER_ID);

      setTodosFromServer(todos);
    } catch {
      setIsError(true);
      setTimeout(() => setIsError(false), 3000);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const getVisibleTodos = () => {
    switch (filter) {
      case 'Active':
        return todosFromServer.filter(todo => !todo.completed);

      case 'Completed':
        return todosFromServer.filter(todo => todo.completed);

      default:
        return todosFromServer;
    }
  };

  const visibleTodos = useMemo(
    getVisibleTodos,
    [filter, todosFromServer],
  );

  const changeFilter = (value: string) => setFilter(value);

  const hideNotification = () => setIsHidden(true);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />

        {todosFromServer.length > 0 && (
          <TodoList
            todos={visibleTodos}
          />
        )}

        {todosFromServer.length > 0 && (
          <TodoFooter
            filterOptions={filterOptions}
            todos={visibleTodos}
            filter={filter}
            changeFilter={changeFilter}
          />
        )}
      </div>

      {isError && (
        <div
          className={classNames(
            'notification is-danger is-light has-text-weight-normal', {
              hidden: isHidden,
            },
          )}
        >
          <button
            type="button"
            className="delete"
            onClick={hideNotification}
          />
          Unable to add a todo
        </div>
      )}
    </div>
  );
};
