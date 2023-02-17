/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { getTodos } from './api/todos';

import { Header } from './components/Header';
import { Notification } from './components/Notification';
import { Footer } from './components/Footer';
import { TodosList } from './components/TodosList';

import { Todo } from './types/Todo';
import { Status } from './types/Status';

const USER_ID = 6341;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState<Status>(Status.All);

  useEffect(() => {
    getTodos(USER_ID)
      .then(todosFromServer => {
        setTodos(todosFromServer);
      })
      .catch(() => {
        setError('upload');
      });
  }, []);

  const visibleTodos = todos.filter(todo => {
    switch (status) {
      case Status.Active:
        return !todo.completed;

      case Status.Completed:
        return todo.completed;

      case Status.All:
        return true;

      default:
        throw new Error('Unexpected status');
    }
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          todos={visibleTodos}
          query={query}
          setQuery={setQuery}
        />

        <TodosList
          todos={visibleTodos}
        />

        {visibleTodos.length > 0 && (
          <Footer
            todos={visibleTodos}
            status={status}
            setStatus={setStatus}
          />
        )}
      </div>

      {error && (
        <Notification
          error={error}
        />
      )}
    </div>
  );
};
