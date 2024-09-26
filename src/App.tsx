import React, { useState, useEffect } from 'react';
import { USER_ID, getTodos } from './api/todos';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TodoList } from './components/TodoList';
import { Status } from './types/Status';
import { ErrorNotification } from './components/ErrorNotification';
import { UserWarning } from './UserWarning';
import { useTodosContext } from './components/useTodosContext';

export const App: React.FC = () => {
  const { todos, setTodos, handleError, setIsInputFocused } = useTodosContext();
  const [query, setQuery] = useState<Status>(Status.All);

  useEffect(() => {
    setIsInputFocused(true);

    getTodos()
      .then(setTodos)
      .catch(() => handleError('Unable to load todos'));
  }, [setTodos, handleError, setIsInputFocused]);

  return USER_ID ? (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        <TodoList query={query} />
        {todos.length !== 0 && <Footer query={query} setQuery={setQuery} />}
      </div>

      <ErrorNotification />
    </div>
  ) : (
    <UserWarning />
  );
};
