/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Header } from './components/Header';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Notification } from './components/Notification';
import { StatusTodos } from './types/StatusTodo';

const USER_ID = 9946;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState('all');
  const [isError, setIsError] = useState(false);

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (status) {
        case StatusTodos.ACTIVE:
          return !todo.completed;
        case StatusTodos.COMPLETED:
          return todo.completed;
        default:
          return StatusTodos.ALL;
      }
    });
  }, [status, todos]);

  const loadTodos = async () => {
    try {
      const todosData = await getTodos(USER_ID);

      if ('Error' in todosData) {
        throw new Error('Error');
      } else {
        setTodos(todosData);
      }
    } catch (error) {
      setIsError(true);

      setTimeout(() => {
        setIsError(false);
      }, 3000);
      throw new Error('Error');
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <section className="todoapp__main">
          <TodoList
            todos={filteredTodos}
          />
        </section>

        {todos.length > 0 && (
          <TodoFilter
            visibleTodos={filteredTodos}
            status={status}
            onStatusChanges={setStatus}
          />
        )}

      </div>

      {isError && (
        <Notification
          error={isError}
          deleteError={setIsError}
        />
      )}

    </div>
  );
};
