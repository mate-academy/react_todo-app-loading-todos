/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Footer } from './components/Footer';
import { TodoList } from './components/TodoList';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TodoFilter } from './types/Filters';
import { filterTodos } from './helpers/filterTodos';
import { ErrorNotification } from './components/ErrorNotification';
import { Header } from './components/Header';

const USER_ID = 10858;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<TodoFilter>(TodoFilter.All);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => setError('Unable to load todos'));
  }, []);

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (error) {
      timerId = setTimeout(() => setError(null), 3000);
    }

    return () => clearTimeout(timerId);
  }, [error]);

  const visibleTodos = useMemo(() => (
    filter === TodoFilter.All
      ? todos
      : filterTodos(todos, filter)
  ), [todos, filter]);

  const hasCompletedTodo = useMemo(() => (
    todos.some(todo => todo.completed)
  ), [todos]);

  const activeTodosCount = useMemo(() => (
    todos
      .filter(todo => !todo.completed).length
  ), [todos]);

  const handleFilterChange = (newFilter: TodoFilter) => {
    setFilter(newFilter);
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <section className="todoapp__main">
          <TodoList
            todos={visibleTodos}
          />
        </section>

        {todos.length > 0 && (
          <Footer
            isAnyCompleted={hasCompletedTodo}
            activeTodosCount={activeTodosCount}
            onFilterChange={handleFilterChange}
            selectedFilter={filter}
          />
        )}
      </div>

      <ErrorNotification
        error={error}
        setError={setError}
      />

    </div>
  );
};
