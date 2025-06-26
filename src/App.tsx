import React, { useState, useEffect, useMemo } from 'react';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';

import TodoHeader from './components/TodoHeader';
import TodoList from './components/TodoList';
import TodoFooter from './components/TodoFooter';
import { USER_ID } from './api/todos';
import { UserWarning } from './UserWarning';
import ErrorNotification from './components/ErrorNotification';

import './styles/index.scss';
import './styles/todoapp.scss';

export type FilterKey = 'all' | 'active' | 'completed';
const FILTER_MAP: Record<FilterKey, (todo: Todo) => boolean> = {
  all: () => true,
  active: (todo: Todo) => !todo.completed,
  completed: (todo: Todo) => todo.completed,
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterKey>('all');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingTodoIds] = useState<number[]>([]);

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash;
      let key: FilterKey = 'all';

      if (hash === '#/active') {
        key = 'active';
      } else if (hash === '#/completed') {
        key = 'completed';
      }

      setFilter(key);
    };

    window.addEventListener('hashchange', onHashChange);
    onHashChange();

    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    setErrorMessage('');
    setIsLoading(true);
    getTodos()
      .then(data => setTodos(data))
      .catch(() => setErrorMessage('Unable to load todos'))
      .finally(() => setIsLoading(false));
  }, []);

  const activeCount = useMemo(
    () => todos.filter(t => !t.completed).length,
    [todos],
  );
  const completedCount = useMemo(
    () => todos.filter(t => t.completed).length,
    [todos],
  );
  const filteredTodos = useMemo(
    () => todos.filter(todo => FILTER_MAP[filter](todo)),
    [todos, filter],
  );

  // Handler dodawania (title z Header)
  const handleAdd = () => {
    /* ... */
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <TodoHeader isLoading={isLoading} onAdd={handleAdd} />

      {isLoading && <div className="loading">Loading...</div>}

      {!isLoading && (
        <>
          {todos.length > 0 && (
            <TodoList
              todos={filteredTodos}
              loadingIds={loadingTodoIds}
              globalLoading={isLoading}
              onDelete={() => {}}
              onToggle={() => {}}
            />
          )}
          {todos.length > 0 && (
            <TodoFooter
              activeCount={activeCount}
              completedCount={completedCount}
              currentFilter={filter}
              onFilterChange={setFilter}
              onClearCompleted={() => {}}
            />
          )}
        </>
      )}

      <ErrorNotification
        message={errorMessage}
        onClose={() => setErrorMessage('')}
      />
    </div>
  );
};

export default App;
