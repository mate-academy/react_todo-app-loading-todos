/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Notification } from './components/Notification';
import { Status } from './enums/Status';

const USER_ID = 7010;

function filteredTodos(todos: Todo[], status: Status) {
  if (status !== Status.All) {
    return [...todos].filter(todo => {
      return status === Status.Completed
        ? todo.completed
        : !todo.completed;
    });
  }

  return todos;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState(Status.All);
  const [hasError, setError] = useState('');

  const changeStatus = (newStatus: Status) => {
    setStatus(newStatus);
  };

  const loadTodos = useCallback(
    async () => {
      try {
        const loadedTodos = await getTodos(USER_ID);

        setTodos(loadedTodos);
        setError('');
      } catch {
        setError('Unable to add a todo');
        setTimeout(() => setError(''), 3000);
      }
    }, [getTodos],
  );

  useEffect(() => {
    loadTodos();
  }, []);

  const vidibleTodos = filteredTodos(todos, status);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todos={vidibleTodos} />

        {todos.length > 0 && (
          <>
            <TodoList todos={vidibleTodos} />
            <Footer
              todos={vidibleTodos}
              selectedStatus={status}
              changeStatus={changeStatus}
            />
          </>
        )}
      </div>

      <Notification
        error={hasError}
        onClose={() => setError('')}
      />
    </div>
  );
};
