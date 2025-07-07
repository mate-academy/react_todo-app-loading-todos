/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect, useRef } from 'react';
import { USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';
import { client } from './utils/fetchClient';
import { ErrorNotification } from './components/ErrorNotification';
import { Footer } from './components/Footer';
import { TodoList } from './components/TodoList';
import { Header } from './components/Header';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>();
  const [filter, setFilter] = useState<Filter>('all');
  const [error, setError] = useState<string | null>(null);
  const errorTimeout = useRef<number | null>(null);

  function hideErrorButton() {
    setError(null);
  }

  function handleNewFilterMode(mode: Filter) {
    setFilter(mode);
  }

  const activeTodos = todos?.filter(todo => !todo.completed).length;

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await client.get<Todo[]>(`/todos?userId=${USER_ID}`);

        setTodos(response);
      } catch {
        if (errorTimeout.current !== null) {
          clearTimeout(errorTimeout.current);
        }

        setError('Unable to load todos');
        errorTimeout.current = window.setTimeout(() => setError(null), 3000);
      }
    };

    fetchTodos();
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {todos?.length !== 0 && (
          <>
            <TodoList todos={todos ?? []} filter={filter} />

            <Footer
              activeTodos={activeTodos ?? 0}
              filter={filter}
              handleNewFilterMode={handleNewFilterMode}
            />
          </>
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <ErrorNotification hideErrorButton={hideErrorButton} error={error} />
    </div>
  );
};
