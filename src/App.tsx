import React, { useEffect, useState, useMemo } from 'react';
import classNames from 'classnames';
import { Todo } from './types/Todo';
import { FilterStatus } from './types/FilterStatus';
import { ErrorMessage } from './types/ErrorMessage';
import { getTodos } from './api/todos';
import { TodoList } from './components/TodoList';
import { Filter } from './components/Filter';
import { NewTodo } from './components/NewTodo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>(
    ErrorMessage.None,
  );
  const [filter, setFilter] = useState<FilterStatus>(FilterStatus.All);

  useEffect(() => {
    setErrorMessage(ErrorMessage.None);

    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage(ErrorMessage.Load);
      });
  }, []);

  useEffect(() => {
    if (!errorMessage) {
      return;
    }

    const timerId = setTimeout(() => {
      setErrorMessage(ErrorMessage.None);
    }, 3000);

    return () => {
      clearTimeout(timerId);
    };
  }, [errorMessage]);

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (filter) {
        case FilterStatus.Active:
          return !todo.completed;
        case FilterStatus.Completed:
          return todo.completed;
        case FilterStatus.All:
        default:
          return true;
      }
    });
  }, [todos, filter]);

  const activeTodosCount = useMemo(() => {
    return todos.filter(todo => !todo.completed).length;
  }, [todos]);

  const hasCompleted = useMemo(() => {
    return todos.some(todo => todo.completed);
  }, [todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (
            <button
              type="button"
              className={classNames('todoapp__toggle-all', {
                active: activeTodosCount === 0,
              })}
              data-cy="ToggleAllButton"
            />
          )}

          <NewTodo />
        </header>

        {todos.length > 0 && (
          <>
            <TodoList todos={visibleTodos} />

            <footer className="todoapp__footer" data-cy="Footer">
              <span className="todo-count" data-cy="TodosCounter">
                {activeTodosCount} items left
              </span>

              <Filter filter={filter} onFilterChange={setFilter} />

              <button
                type="button"
                className="todoapp__clear-completed"
                data-cy="ClearCompletedButton"
                disabled={!hasCompleted}
              >
                Clear completed
              </button>
            </footer>
          </>
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
          onClick={() => setErrorMessage(ErrorMessage.None)}
        />
        {errorMessage}
      </div>
    </div>
  );
};
