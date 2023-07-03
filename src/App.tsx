/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { Todo } from './types/Todo';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Filter } from './components/Filter';
import { Filtering } from './types/Filter';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Notifications } from './components/Notifications/Notification';

const USER_ID = 10921;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filtering>(Filtering.ALL);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getTodos(USER_ID)
      .then((todosFromServer: Todo[]) => setTodos(todosFromServer))
      .catch(() => {
        setError('Failed to load todos');
        setTimeout(() => setError(null), 3000);
      });
  }, []);

  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  const visibleTodos = useMemo(() => {
    switch (filter) {
      case Filtering.ACTIVE:
        return activeTodos;

      case Filtering.COMPLETED:
        return completedTodos;

      default:
        return todos;
    }
  }, [filter, todos]);

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

            <Filter
              filter={filter}
              setFilter={setFilter}
            />

            {completedTodos.length > 0 && (
              <button type="button" className="todoapp__clear-completed">
                Clear completed
              </button>
            )}
          </footer>
        )}
      </div>
      <Notifications
        error={error}
        setError={setError}
      />
    </div>
  );
};
