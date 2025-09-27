/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { UserWarning } from './UserWarning';
import { Todo, Filter } from './types/Todo';
import { getTodos, USER_ID } from './api/todos';

import { TodoItem } from './TodoItem';
import { NewTodoForm } from './NewTodoForm';
import { ToggleAllButton } from './ToggleAllButton';
import { Footer } from './Footer';
import { ErrorNotification } from './ErrorNotification';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [filter, setFilter] = useState<Filter>('All');

  const showError = useCallback((message: string) => {
    setError(message);
    setTimeout(() => {
      setError('');
    }, 3000);
  }, []);

  const clearError = useCallback(() => {
    setError('');
  }, []);

  useEffect(() => {
    if (!USER_ID) {
      return;
    }

    const loadTodos = async () => {
      try {
        const data = await getTodos();

        setTodos(data);
      } catch (e) {
        showError('Unable to load todos');
      } finally {
        setLoading(false);
      }
    };

    loadTodos();
  }, [showError]);

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (filter) {
        case 'Active':
          return !todo.completed;
        case 'Completed':
          return todo.completed;
        case 'All':
        default:
          return true;
      }
    });
  }, [todos, filter]);

  const activeTodosCount = useMemo(
    () => todos.filter(todo => !todo.completed).length,
    [todos],
  );
  const hasCompletedTodos = useMemo(
    () => todos.some(t => t.completed),
    [todos],
  );
  const isAllCompleted = useMemo(
    () => todos.length > 0 && todos.every(todo => todo.completed),
    [todos],
  );
  const shouldShowList = todos.length > 0;

  const handleToggleAll = () => {
    console.log('Toggle All clicked - functionality disabled in this part.');
  };

  const handleFilterChange = useCallback((newFilter: Filter) => {
    setFilter(newFilter);
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  if (loading) {
    return <div className="loader">Loading todos...</div>;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <ToggleAllButton
            isAllCompleted={isAllCompleted}
            todosCount={todos.length}
            onToggleAll={handleToggleAll}
          />
          <NewTodoForm />
        </header>

        {shouldShowList && (
          <section className="todoapp__main" data-cy="TodoList">
            {filteredTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                //onDelete={handleDeleteTodo}
              />
            ))}
          </section>
        )}

        {shouldShowList && (
          <Footer
            activeTodosCount={activeTodosCount}
            currentFilter={filter}
            onFilterChange={handleFilterChange}
            hasCompletedTodos={hasCompletedTodos}
            //onClearCompleted={handleClearCopleted}
          />
        )}
      </div>

      <ErrorNotification error={error} clearError={clearError} />
    </div>
  );
};
