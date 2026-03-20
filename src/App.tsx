import React, { useEffect, useMemo } from 'react';
import * as todoService from './api/todos';
import { Todo } from './types/Todo';
import { Header } from './component/Header';
import { Footer } from './component/Footer';
import { TodoList } from './component/TodoList';
import { ErrorNotification } from './component/ErrorNotification';

export const App: React.FC = () => {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [filter, setFilter] = React.useState<`all` | 'active' | 'completed'>(
    'all',
  );
  const [error, setError] = React.useState<string>('');

  const isAllCompleted = todos.every(todo => todo.completed);
  const isAnyCompleted = todos.some(todo => todo.completed);
  const notCompletedCount = isAllCompleted
    ? 0
    : todos.filter(todo => !todo.completed).length;

  useEffect(() => {
    todoService
      .getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
      })
      .catch(() => setError('Unable to load todos'));
  }, []);

  const handleErrorClose = () => setError('');

  const visibleTodos = useMemo(() => {
    if (filter === 'all') {
      return todos;
    }

    return todos.filter(todo =>
      filter === 'active' ? !todo.completed : todo.completed,
    );
  }, [todos, filter]);

  useEffect(() => {
    if (!error) {
      return;
    }

    const timer = setTimeout(() => {
      setError('');
    }, 3000);

    return () => clearTimeout(timer);
  }, [error]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          isAllCompleted={isAllCompleted}
          isPresentTodos={todos.length > 0}
        />
        <TodoList todos={visibleTodos} />
        {todos.length > 0 && (
          <Footer
            isAnyCompleted={isAnyCompleted}
            notCompletedCount={notCompletedCount}
            selectedFilter={filter}
            onFilterChange={setFilter}
          />
        )}
      </div>
      <ErrorNotification onErrorClose={handleErrorClose} error={error} />
    </div>
  );
};
