import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { FilterStatus } from './types/FilterStatus';
import { Error } from './components/ErrorBlock/Error';

const USER_ID = 10266;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [filter, setFilter] = useState(FilterStatus.ALL);

  const handleCloseError = () => {
    setError(null);
  };

  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case FilterStatus.ACTIVE:
        return !todo.completed;
      case FilterStatus.COMPLETED:
        return todo.completed;
      default:
        return true;
    }
  });

  useEffect(() => {
    async function fetchTodos() {
      try {
        setError(null);
        const response = await getTodos(USER_ID);

        setTodos(response);
      } catch (err) {
        setError(err as Error);
      }
    }

    fetchTodos();
  }, []);

  useEffect(() => {
    const hideNotification = setTimeout(() => {
      setError(null);
    }, 3000);

    return () => clearTimeout(hideNotification);
  }, [error]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const hasCompletedTodos = todos.some((todo) => todo.completed);
  const hasActiveTodos = todos.some((todo) => !todo.completed);
  const activeTodosCount = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="todoapp">

      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header hasActiveTodos={hasActiveTodos} />

        {todos.length !== 0 && (
          <>
            <TodoList todos={filteredTodos} />
            <Footer
              hasCompletedTodos={hasCompletedTodos}
              activeTodosCount={activeTodosCount}
              filter={filter}
              setFilter={setFilter}
            />
          </>
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      {error && (
        <Error onClose={handleCloseError} />
      )}
    </div>
  );
};
