/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { TodoList } from './components/TodoList';
import { Filter } from './components/Filter';
import { NewTodo } from './components/NewTodo';
import { FILTERS } from './types/FILTERS';

export const App: React.FC = () => {
  const USER_ID = 12353;
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [filter, setFilter] = useState(FILTERS.ALL);
  const visibleTodos = useMemo(() => {
    switch (filter) {
      case FILTERS.ALL:
        return todos;

      case FILTERS.ACTIVE:
        return todos.filter(todo => !todo.completed);

      case FILTERS.COMPLETED:
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  }, [todos, filter]);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch((error) => {
        setErrorMessage('Unable to download todos');
        throw error;
      });
  }, []);

  useEffect(() => {
    let timeoutId: unknown;

    if (errorMessage !== '') {
      const clearErrorMessage = () => setErrorMessage('');

      if (typeof timeoutId === 'number') {
        clearTimeout(timeoutId as number);
      }

      timeoutId = setTimeout(clearErrorMessage, 3000);
    }

    return () => {
      if (typeof timeoutId === 'number') {
        clearTimeout(timeoutId as number);
      }
    };
  }, [errorMessage]);

  const allTodoComplited = useMemo(() => {
    return todos.every(todo => todo.completed) && todos.length !== 0;
  }, [todos]);

  const uncomplitedTodos = useMemo(() => (
    todos.filter(todo => !todo.completed).length
  ), [todos]);

  const complitedTodos = useMemo(() => (
    todos.filter(todo => todo.completed).length
  ), [todos]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length !== 0 && (
            <button
              type="button"
              className={classNames(
                'todoapp__toggle-all',
                { active: allTodoComplited },
              )}
            />
          )}

          <NewTodo
            USER_ID={USER_ID}
            setTodos={setTodos}
            setErrorMessage={setErrorMessage}
          />
        </header>

        {todos.length !== 0 && (
          <>
            <TodoList visibleTodos={visibleTodos} />

            <footer className="todoapp__footer">
              <span className="todo-count">
                {`${uncomplitedTodos} items left`}
              </span>

              <Filter
                filter={filter}
                setFilter={setFilter}
              />

              {complitedTodos !== 0 && (
                <button type="button" className="todoapp__clear-completed">
                  Clear completed
                </button>
              )}
            </footer>
          </>
        )}
      </div>

      <div className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: errorMessage.length === 0 },
      )}
      >
        <button
          type="button"
          className="delete"
          onClick={() => setErrorMessage('')}
        />
        {errorMessage}
      </div>
    </div>
  );
};
