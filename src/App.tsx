/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { ErrorMessage } from './components/ErrorMessage/ErrorMessage';
import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { TodoFilter } from './components/TodoFilter/TodoFilter';
import { FilterBy } from './utils/enums';

const USER_ID = 10897;

const testTodos: Todo[] = [
  {
    id: 1,
    userId: USER_ID,
    title: 'Hi',
    completed: true,
  },
  {
    id: 2,
    userId: USER_ID,
    title: 'Hi',
    completed: false,
  },
  {
    id: 3,
    userId: USER_ID,
    title: 'Hi',
    completed: false,
  },
  {
    id: 4,
    userId: USER_ID,
    title: 'Hi',
    completed: false,
  },
];

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(testTodos);
  const [hasActive, setHasActive] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [errorText, setErrorText] = useState<null | string>(null);
  const [filterBy, setFilterBy] = useState(FilterBy.ALL);

  const resetError = () => {
    setErrorText(null);
  };

  useEffect(() => {
    getTodos(USER_ID)
      .then(response => {
        setTodos(response);
        setHasActive(response.some(todo => !todo.completed));
        setHasCompleted(response.some(todo => todo.completed));
      })
      .catch((error) => {
        setErrorText(error.message);
        setTimeout(resetError, 3000);
      });
  }, []);

  const handleFilterChange = useCallback((event: React.MouseEvent) => {
    const target = event.target as HTMLButtonElement;

    setFilterBy(target.innerText.toLowerCase() as FilterBy);
  }, []);

  const visibleTodos = filterBy === FilterBy.ALL
    ? todos
    : todos.filter(todo => {
      if (filterBy === FilterBy.ACTIVE) {
        return !todo.completed;
      }

      return todo.completed;
    });

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {hasActive && (
            <button type="button" className="todoapp__toggle-all active" />
          )}
          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {Boolean(todos.length) && (
          <>
            <TodoList todos={visibleTodos} />
            <TodoFilter
              amountTodos={visibleTodos.length}
              filterStatus={filterBy}
              handleFilterChange={handleFilterChange}
              hasCompleted={hasCompleted}
            />
          </>
        )}
      </div>

      <ErrorMessage
        errorText={errorText}
        clearError={resetError}
      />
    </div>
  );
};
