import React, { useEffect, useMemo, useState } from 'react';

import { Filter } from './components/Filter';
import { Header } from './components/Header';
import { Notifications } from './components/Notifications';
import { TodoList } from './components/TodoList';
import { FilterOptions } from './types/FilterOptions';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { UserWarning } from './UserWarning';

const USER_ID = 10873;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterOptions>(FilterOptions.ALL);

  useEffect(() => {
    getTodos(USER_ID)
      .then((todosFromServer: Todo[]) => setTodos(todosFromServer))
      .catch(() => setError('Unable to get todos'));
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (error) {
      timeoutId = setTimeout(() => setError(null), 3000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [error]);

  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  const visibleTodos = useMemo(() => {
    switch (filter) {
      case FilterOptions.ACTIVE:
        return activeTodos;

      case FilterOptions.COMPLETED:
        return completedTodos;

      default:
        return todos;
    }
  }, [todos, filter]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList todos={visibleTodos} />

        {todos.length > 0 && (
          <footer className="todoapp__footer">
            <span className="todo-count">
              {`${activeTodos.length} items left`}
            </span>

            <Filter filter={filter} setFilter={setFilter} />

            {completedTodos.length > 0 && (
              <button type="button" className="todoapp__clear-completed">
                Clear completed
              </button>
            )}
          </footer>
        )}
      </div>

      <Notifications error={error} setError={setError} />
    </div>
  );
};
