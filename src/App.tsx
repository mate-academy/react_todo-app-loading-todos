/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect, useMemo } from 'react';
import { UserWarning } from './UserWarning';
import { TodoHeader } from './components/TodoHeader/TodoHeader';
import { TodoList } from './components/TodoList/TodoList';
import { TodoFilter } from './components/TodoFilter/TodoFilter';
import { Notification } from './components/Notification/Notification';

import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { TodoStatus } from './types/TodoStatus';

const USER_ID = 10140;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [status, setStatus] = useState<TodoStatus>(TodoStatus.All);
  const [itemsLeft, setItemsLeft] = useState<number>(0);
  const [itemsCompleted, setItemsCompleted] = useState<number>(0);

  const countItemsLeft = todos.filter(todo => !todo.completed).length;
  const countItemsCompleted = todos.filter(todo => todo.completed).length;

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

  const filtredTodos = useMemo(() => {
    switch (status) {
      case 'all':
        return todos;
      case 'active':
        return todos.filter((todo) => !todo.completed);
      case 'completed':
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [todos, status]);

  useEffect(() => {
    setItemsLeft(countItemsLeft);
    setItemsCompleted(countItemsCompleted);
  }, [countItemsLeft, countItemsCompleted]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />

        <TodoList
          todos={filtredTodos}
        />

        {todos.length !== 0
          && (
            <TodoFilter
              onStatusChanged={(newStatus) => setStatus(newStatus)}
              status={status}
              itemsLeft={itemsLeft}
              itemsCompleted={itemsCompleted}
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
