/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
//#region import
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { client } from './utils/fetchClient';
import { Todo } from './types/Todo';
import { ErrorType } from './types/ErrorType';
import { ErrorNotification } from './components/ErrorNotification/ErrorNotification';
//#endregion

export const App: React.FC = () => {
  function prepairedTodo(todos: Todo[], status: string, query: string): Todo[] {
    let result = [...todos];

    if (status === 'active') {
      result = result.filter(todo => !todo.completed);
    }

    if (status === 'completed') {
      result = result.filter(todo => todo.completed);
    }

    if (query.trim()) {
      const normalizedQuery = query.toLowerCase();

      result = result.filter(todo =>
        todo.title.toLowerCase().includes(normalizedQuery),
      );
    }

    return result;
  }

  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState('all');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [query, setQuery] = useState('');
  const [error, setError] = useState<ErrorType>(null);
  const visibleTodos = prepairedTodo(todos, status, query);

  useEffect(() => {
    client
      .get<Todo[]>('/todos?userId=3838')
      .then(setTodos)
      .catch(() => setError('LOAD_TODOS'));
  }, []);

  useEffect(() => {
    if (!error) {
      return;
    }

    const timerId = setTimeout(() => {
      setError(null);
    }, 3000);

    return () => {
      clearTimeout(timerId);
    };
  }, [error]);

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
          <Footer onStatusChange={setStatus} status={status} todos={todos} />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <ErrorNotification error={error} onClose={() => setError(null)} />
    </div>
  );
};
