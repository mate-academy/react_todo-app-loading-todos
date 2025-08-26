import React, { useEffect, useMemo, useRef, useState } from 'react';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { FilterBy } from './types/Filter';
import { UserWarning } from './components/UserWarning';

import { NewTodo } from './components/NewTodo';
import { TodoList } from './components/TodoList';
import { Filter } from './components/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);
  const errorTimerRef = useRef<number | null>(null);

  const [filterBy, setFilterBy] = useState<FilterBy>(FilterBy.All);

  useEffect(() => {
    const load = async () => {
      if (errorTimerRef.current !== null) {
        window.clearTimeout(errorTimerRef.current);
        errorTimerRef.current = null;
      }

      setIsLoading(true);
      setShowError(false);
      setError(null);

      try {
        await new Promise(r => setTimeout(r, 150));
        const data = await getTodos(USER_ID);

        setTodos(data);
      } catch {
        setError('Unable to load todos');
        setShowError(true);
        errorTimerRef.current = window.setTimeout(() => {
          setShowError(false);
          errorTimerRef.current = null;
        }, 3000);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);

  const hasTodos = todos.length > 0;

  const activeCount = useMemo(
    () => todos.filter(t => !t.completed).length,
    [todos],
  );
  const completedCount = useMemo(
    () => todos.filter(t => t.completed).length,
    [todos],
  );

  const filteredTodos = useMemo(() => {
    switch (filterBy) {
      case FilterBy.Active:
        return todos.filter(t => !t.completed);
      case FilterBy.Completed:
        return todos.filter(t => t.completed);
      default:
        return todos;
    }
  }, [todos, filterBy]);

  return (
    <div className="todoapp" aria-busy={isLoading}>
      {/* required by tests */}
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        {/* Part-1: input stays disabled; props are ready for Part-2 */}
        <NewTodo disabled />

        {hasTodos && (
          <>
            <TodoList todos={filteredTodos} disableActions />

            <Filter
              active={filterBy}
              onChange={setFilterBy}
              activeCount={activeCount}
              completedCount={completedCount}
              onClearCompleted={() => {}}
              hasTodos={hasTodos}
            />
          </>
        )}
      </div>

      <UserWarning
        hidden={!showError}
        message={error ?? ''}
        onClose={() => {
          if (errorTimerRef.current !== null) {
            window.clearTimeout(errorTimerRef.current);
            errorTimerRef.current = null;
          }

          setShowError(false);
        }}
      />
    </div>
  );
};
