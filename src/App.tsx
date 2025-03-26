/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';

import { FilterStatus } from './utils/FilterStatus';
import { Todo } from './types/Todo';
import { Error } from './components/Error';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [filter, setFilter] = useState<FilterStatus>(FilterStatus.All);

  const handleHideError = () => {
    setError('');
  };

  const loadTodos = () => {
    if (!USER_ID) {
      return;
    }

    setLoading(true);
    setError('');

    getTodos()
      .then(result => setTodos(result))
      .catch(err => setError(err.message || 'Unable to load todos'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    if (!error) {
      return;
    }

    const timer = setTimeout(() => {
      setError('');
    }, 3000);

    return () => clearTimeout(timer);
  }, [error]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === FilterStatus.All) {
      return true;
    }

    if (filter === FilterStatus.Active) {
      return !todo.completed;
    }

    if (filter === FilterStatus.Completed) {
      return todo.completed;
    }

    return true;
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      {loading && <div>Loading...</div>}

      <div className="todoapp__content">
        <Header />

        <TodoList filteredTodos={filteredTodos} />

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <Footer filter={filter} setFilter={setFilter} todos={todos} />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <Error error={error} handleHideError={handleHideError} />
    </div>
  );
};
