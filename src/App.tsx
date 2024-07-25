import React, { useEffect, useMemo, useState } from 'react';
import cn from 'classnames';
import { Filter } from './types/Filter';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { getTodos } from './api/todos';

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isLoadingError, setIsLoadingError] = useState<boolean>(false);
  const [filter, setFilter] = useState<Filter>(Filter.all);

  const isError = useMemo(() => isLoadingError, [isLoadingError]);

  const areThereCompletedTodos = useMemo(() => {
    return todosFromServer.some(todo => todo.completed);
  }, [todosFromServer]);

  const activeTodosCount = useMemo(() => {
    return todosFromServer.reduce((prev, todo) => {
      if (!todo.completed) {
        return prev + 1;
      }

      return prev;
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
    }
  }, [todosFromServer, filter]);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodosFromServer)
      .catch(error => {
        setIsLoadingError(true);
        setTimeout(() => {
          setIsLoadingError(false);
        }, 3000);
        throw error;
      })
      .finally(() => setLoading(false));
  }, []);

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

          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {!loading && !!todosFromServer.length && (
          <TodoList
            displayedTodos={displayedTodos}
            filter={filter}
            setFilter={setFilter}
            activeTodosCount={activeTodosCount}
            areThereCompletedTodos={areThereCompletedTodos}
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
        {isLoadingError && 'Unable to load todos'}
      </div>
    </div>
  );
};
