/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TodoList } from './components/TodoList';
import { ErrorNotification } from './components/ErrorNotification';

type FilterStatus = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterStatus>('all');
  const [isErrorHidden, setIsErrorHidden] = useState(true);

  useEffect(() => {
    if (!USER_ID) {
      return;
    }

    const loadTodos = async () => {
      setIsLoading(true);
      setIsErrorHidden(true);

      try {
        const loadedTodos = await getTodos();

        setTodos(loadedTodos);
      } catch {
        setErrorMessage('Unable to load todos');
        setIsErrorHidden(false);
        setTimeout(() => setIsErrorHidden(true), 3000);
      } finally {
        setIsLoading(false);
      }
    };

    loadTodos();
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const completedTodosCount = todos.filter(todo => todo.completed).length;

  const handleFilterChange = (newFilter: FilterStatus) => {
    setFilter(newFilter);
  };

  const closeError = () => {
    setIsErrorHidden(true);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header activeTodosCount={activeTodosCount} />

        {isLoading && (
          <div className="todoapp__loading">
            <div className="loader" />
          </div>
        )}

        {!isLoading && todos.length > 0 && (
          <>
            <TodoList todos={filteredTodos} />

            <Footer
              filter={filter}
              onFilterChange={handleFilterChange}
              activeCount={activeTodosCount}
              completedCount={completedTodosCount}
            />
          </>
        )}
      </div>

      <ErrorNotification
        message={errorMessage}
        isHidden={isErrorHidden}
        onClose={closeError}
      />
    </div>
  );
};
