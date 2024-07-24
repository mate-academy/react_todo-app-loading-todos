/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Filter } from './types/Filter';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { TodoFilter } from './components/TodoFilter/TodoFilter';
import cn from 'classnames';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<Filter>(Filter.all);

  const isError = useMemo(() => error, [error]);

  const isCompletedTodos = useMemo(() => {
    return todosFromServer.some(todo => todo.completed);
  }, [todosFromServer]);

  const activeTodosLeft = useMemo(() => {
    return todosFromServer.reduce((acc, todo) => {
      if (!todo.completed) {
        return acc + 1;
      }

      return acc;
    }, 0);
  }, [todosFromServer]);

  const displayedTodos = useMemo(() => {
    switch (filter) {
      case Filter.all:
        return todosFromServer;
      case Filter.active:
        return todosFromServer.filter(todo => !todo.completed);
      case Filter.completed:
        return todosFromServer.filter(todo => todo.completed);
      default:
        return todosFromServer;
    }
  }, [todosFromServer, filter]);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodosFromServer)
      .catch(err => {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 3000);
        throw err;
      })
      .finally(() => setLoading(false));
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <header className="todoapp__header">
          {!!displayedTodos.length && (
            <button
              type="button"
              className={cn('todoapp__toggle-all', {
                active:
                  todosFromServer.every(todo => todo.completed) &&
                  !!todosFromServer.length,
              })}
              data-cy="ToggleAllButton"
            />
          )}
          <Header />
        </header>
        {!loading && !!todosFromServer.length && (
          <TodoList displayedTodos={displayedTodos} />
        )}
        {!loading && !!todosFromServer.length && (
          <TodoFilter
            filter={filter}
            setFilter={setFilter}
            activeTodosCount={activeTodosLeft}
            areThereCompletedTodos={isCompletedTodos}
          />
        )}
      </div>
      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          { hidden: !isError },
        )}
      >
        <button data-cy="HideErrorButton" type="button" className="delete" />
        {isError && 'Unable to load todos'}
      </div>
    </div>
  );
};
