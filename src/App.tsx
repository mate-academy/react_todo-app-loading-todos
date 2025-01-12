/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */

import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { Header } from './components/Header';
import { Filter } from './components/Filter';
import { Section } from './components/Section';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!USER_ID) {
      return;
    }

    const loadTodos = async (): Promise<void> => {
      setError(null);
      setIsLoading(true);
      try {
        const fetchedTodos = await getTodos();

        setTodos(fetchedTodos);
      } catch (err: unknown) {
        setError('Unable to load todos');
      } finally {
        setIsLoading(false);
      }
    };

    loadTodos();
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="todoapp">
      {!USER_ID ? (
        <UserWarning />
      ) : (
        <>
          <h1 className="todoapp__title">todos</h1>

          <div className="todoapp__content">
            <Header />
            <Section todos={todos} isLoading={isLoading} filter={filter} />
            {/* Hide the footer if there are no todos */}
            {todos.length > 0 && (
              <>
                <Footer todos={todos} />
                {/* Active link should have the 'selected' class */}
                <Filter filter={filter} setFilter={setFilter} />
              </>
            )}
          </div>
          {/* DON'T use conditional rendering to hide the notification */}
          {/* Add the 'hidden' class to hide the message smoothly */}
          <ErrorNotification error={error} setError={setError} />
        </>
      )}
    </div>
  );
};
