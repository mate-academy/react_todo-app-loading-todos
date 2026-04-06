/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { TodoAppHeader } from './components/TodoAppHeader';
import { TodoAppMain } from './components/TodoAppMain';
import { TodoMainFooter } from './components/TodoMainFooter';
import { Todo } from './types/Todo';
import classNames from 'classnames';
import { FilterOptions } from './components/TodoMainFooter/TodoMainFooter';

export const App: React.FC = () => {
  const [notificationError, setNotificationError] = useState(false);

  const [filterTodos, setFilterTodos] = useState<FilterOptions>('all');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loadingTodos, setLoadingTodos] = useState(false);
  const [errorTodos, setErrorTodos] = useState(false);

  const [titleTodo, setTitleTodo] = useState('');

  const filteredTodos = todos.filter(todo => {
    if (filterTodos === 'active') {
      return todo.completed === false;
    }

    if (filterTodos === 'completed') {
      return todo.completed;
    }

    return todos;
  });

  function loadTodos() {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorTodos(true);
        setNotificationError(true);
      })
      .finally(() => {
        setLoadingTodos(false);
        setTimeout(() => {
          setNotificationError(false);
        }, 3000);
      });
  }

  useEffect(() => {
    setLoadingTodos(true);
    loadTodos();
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoAppHeader title={titleTodo} setTitle={setTitleTodo} />

        <TodoAppMain todos={filteredTodos} />

        {todos.length > 0 && (
          <TodoMainFooter
            filterTodos={filterTodos}
            todos={todos}
            onFilterTodos={setFilterTodos}
            setTodos={setTodos}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !notificationError },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setNotificationError(false)}
        />
        {/* show only one message at a time */}
        {errorTodos && !loadingTodos && <span>Unable to load todos</span>}
        {/* Title should not be empty*/}
      </div>
    </div>
  );
};
