/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useEffect, useState, useCallback, useMemo,
} from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { Error } from './components/Error/Error';
import { Footer } from './components/Footer/Footer';
import { Filter } from './types/Filter';

const USER_ID = 10337;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedFilter, setSelectedFilter] = useState(Filter.All);
  const [hasError, setHasError] = useState(false);

  let timeoutId: ReturnType<typeof setTimeout>;

  const loadTodos = async () => {
    try {
      const response = await getTodos(USER_ID);

      setTodos(response);
    } catch {
      setHasError(true);

      timeoutId = setTimeout(() => {
        setHasError(false);
      }, 3000);
    }
  };

  const handleFilterChange = useCallback((filter: Filter) => {
    setSelectedFilter(filter);
  }, []);

  const handleCloseError = useCallback(() => {
    setHasError(false);
  }, []);

  const visibleTodos = useMemo(() => {
    return todos.filter((todo) => {
      switch (selectedFilter) {
        case Filter.All:
          return true;
        case Filter.Active:
          return !todo.completed;
        case Filter.Completed:
          return todo.completed;
        default:
          return false;
      }
    });
  }, [todos, selectedFilter]);

  const activeTodosCount = useMemo(() => {
    return todos.filter((todo) => !todo.completed).length;
  }, [todos]);

  useEffect(() => {
    loadTodos();

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button type="button" className="todoapp__toggle-all active" />

          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {!hasError && todos.length && (
          <>
            <TodoList todos={visibleTodos} />
            <Footer
              onFilterChange={handleFilterChange}
              selectedFilter={selectedFilter}
              activeTodosCount={activeTodosCount}
            />
          </>
        )}

        {hasError && (
          <Error
            hasError={hasError}
            onCloseError={handleCloseError}
          />
        )}
      </div>
    </div>
  );
};
