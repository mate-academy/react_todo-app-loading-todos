/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import { UserWarning } from './UserWarning';
import { TodoHeader } from './components/TodoHeader/TodoHeader';
import { TodoList } from './components/TodoList/TodoList';
import { TodoFilter } from './components/TodoFilter/TodoFilter';
import { Notification } from './components/Notification/Notification';

import { Todo } from './types/Todo';
import { getTodos } from './api/todos';

const USER_ID = 10140;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState<string>('all');

  useEffect(() => {
    getTodos(USER_ID)
      .then((fetchedTodos: Todo[]) => {
        setTodos(fetchedTodos);
      })
      .catch((fetchedError: Error) => {
        setError(fetchedError?.message ?? 'Something went wrong');
      });
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (error) {
      timeout = setTimeout(() => {
        setError(null);
      }, 3000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [error]);

  const filteredByStatus = (todosFromServer: Todo[], StateStatus: string) => {
    switch (StateStatus) {
      case 'all':
        setFilteredTodos(todosFromServer);
        break;
      case 'active':
        setFilteredTodos(todosFromServer.filter((todo) => !todo.completed));
        break;
      case 'completed':
        setFilteredTodos(todosFromServer.filter((todo) => todo.completed));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    filteredByStatus(todos, status);
  }, [status, todos]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />

        <TodoList
          todos={filteredTodos}
        />

        {filteredTodos.length !== 0
          && (
            <TodoFilter
              onStatusChanged={(newStatus) => setStatus(newStatus)}
              status={status}
              items={filteredTodos.length}
            />
          )}
      </div>

      <Notification
        onClose={(value) => setError(value)}
        error={error}
      />

    </div>
  );
};
