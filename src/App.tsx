/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import { AuthContext } from './components/Auth/AuthContext';
import { getTodos } from './api/todos';

import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';

import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState('All');
  const [error, setError] = useState('');
  const [hasError, setHasError] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const getTodosFromServer = async () => {
    if (user) {
      try {
        const todosFromServer = await getTodos(user.id);

        setTodos(todosFromServer);
      } catch (err) {
        setHasError(true);
        setError('error: failed to load todos list');
      }
    }
  };

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    getTodosFromServer();
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header newTodoField={newTodoField} todos={todos} />

        {todos.length > 0 && (
          <>
            <TodoList status={status} todos={todos} />
            <Footer
              status={status}
              setStatus={setStatus}
              todos={todos}
            />
          </>
        )}
      </div>

      <ErrorNotification
        error={error}
        setError={setError}
        hasError={hasError}
        setHasError={setHasError}
      />
    </div>
  );
};
