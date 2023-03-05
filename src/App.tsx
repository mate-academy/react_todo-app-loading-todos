/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { getTodos } from './api/todos';
import { ErrorNotification } from './components/ErrorNotification';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Error } from './types/Error';
import { Status } from './types/Status';
import { Todo } from './types/Todo';
import { UserWarning } from './UserWarning';

const USER_ID = 6472;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState<Status>(Status.All);
  const [error, setError] = useState<Error>(Error.NONE);

  const fetchTodos = async () => {
    const todosFromServer = await getTodos(USER_ID)
      .catch(() => {
        setError(Error.FETCH);

        setTimeout(() => {
          setError(Error.NONE);
        }, 3000);
      });

    if (todosFromServer) {
      setTodos(todosFromServer);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const todosByStatus = useMemo(() => (
    status === Status.All
      ? todos
      : todos.filter(({ completed }) => (
        status === Status.COMPLETED ? completed : !completed
      ))
  ), [status, todos]);

  const completedCount = useMemo(() => (
    todos.reduce((acc, todo) => (
      todo.completed ? acc : acc + 1
    ), 0)
  ), [todos]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        {
          todos.length !== 0 && (
            <>
              <TodoList todos={todosByStatus} />
              <Footer
                completedCount={completedCount}
                status={status}
                setStatus={setStatus}
              />
            </>
          )
        }
      </div>
      <ErrorNotification error={error} onDelete={setError} />
    </div>
  );
};
