import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { getTodos } from './api/todos';
import {
  ErrorNotification,
  Footer,
  Header,
  Navigation,
  TodoList,
} from './components';
import { ActiveFilter, Todo } from './types';
import { makeFilterTodos } from './utils/filters';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [activeFilter, setActiveFilter] = useState<ActiveFilter>('all');

  const [error, setError] = useState('');

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setError('Unable to load todos'));
  }, []);

  const handleHideError = useCallback(() => setError(''), []);

  const todosFiltered = useMemo(
    () => makeFilterTodos(todos, activeFilter),
    [activeFilter, todos],
  );

  const todosActive = useMemo(
    () => todos.filter(({ completed }) => !completed),
    [todos],
  );

  const handleFilterClick = (filter: ActiveFilter) => setActiveFilter(filter);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todos={todos} />

        <TodoList todos={todosFiltered} />
        <Footer hasTodo={!!todos.length} itemsLeft={todosActive.length}>
          <Navigation
            activeFilter={activeFilter}
            onFilterClick={handleFilterClick}
          />
        </Footer>
      </div>

      <ErrorNotification error={error} onHideError={handleHideError} />
    </div>
  );
};
