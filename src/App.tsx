/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { ErrorMessage } from './components/ErrorMessage/ErrorMessage';

const USER_ID = 11219;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [status, setStatus] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    getTodos(USER_ID)
      .then(data => {
        setTodos(data);
        setErrorMessage('');
      })
      .catch(() => {
        setErrorMessage('An error occurred while executing the request');
        setTodos([]);
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const filteredTodos = useMemo(() => {
    const lowerQuery = query.toLowerCase();

    return todos
      .filter(todo => {
        switch (status) {
          case 'active':
            return !todo.completed;
          case 'completed':
            return todo.completed;
          default:
            return true;
        }
      })
      .filter(todo => todo.title.toLowerCase().includes(lowerQuery));
  }, [todos, query, status]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header query={query} setQuery={setQuery} />

        {todos.length !== 0 && <TodoList todos={filteredTodos} />}

        {todos.length !== 0 && (
          <Footer
            todos={todos}
            setStatus={setStatus}
            status={status}
          />
        )}
      </div>

      <ErrorMessage
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
