/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { getTodos } from './api/todos';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Notification } from './components/Notifications';
import { TodoList } from './components/TodoList';
import { Status } from './types/Status';
import { Todo } from './types/Todo';

const USER_ID = 6386;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [hasServerError, setServerError] = useState(false);
  const [status, setStatus] = useState<Status>(Status.All);
  const [query, setQuery] = useState('');
  const [errorType, setErrorType] = useState('');

  const visibletodos = todos.filter(todo => {
    switch (status) {
      case Status.Active:
        return !todo.completed;
      case Status.Completed:
        return todo.completed;
      default:
        return todo;
    }
  });

  const getTodosFromServer = async () => {
    try {
      setServerError(false);
      const todosFromServer = await getTodos(USER_ID);

      setTodos(todosFromServer);
    } catch {
      setServerError(true);
      setErrorType('upload');
    }
  };

  useEffect(() => {
    getTodosFromServer();
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          todos={todos}
          query={query}
          setQuery={setQuery}
        />
        <TodoList todos={visibletodos} />

        {todos.length > 0 && (
          <Footer
            todos={visibletodos}
            status={status}
            setStatus={setStatus}
          />
        )}

      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <Notification
        errorType={errorType}
        hasError={hasServerError}
        setHasError={setServerError}
      />
    </div>
  );
};
