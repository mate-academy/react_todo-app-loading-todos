/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { getTodos } from './api/todos';
import { ErrorMessage } from './components/Error';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { TodoList } from './components/todosList';
import { Error } from './types/Error';
import { Status } from './types/Status';
import { Todo } from './types/Todo';
import { UserWarning } from './UserWarning';

const USER_ID = 6366;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState<Status>(Status.All);
  const [error, setError] = useState<Error>(Error.NONE);

  useEffect(() => {
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

    fetchTodos();
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const todosByStatus = status === Status.All
    ? todos
    : todos.filter(({ completed }) => (
      status === Status.COMPLETED ? completed : !completed
    ));

  const completedCount = todos.reduce((acc, todo) => (
    todo.completed ? acc : acc + 1
  ), 0);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        {
          todos.length !== 0 && (
            <TodoList todos={todosByStatus} />
          )
        }
        {
          todos.length !== 0 && (
            <Footer
              completedCount={completedCount}
              status={status}
              setStatus={setStatus}
            />
          )
        }
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <ErrorMessage error={error} onDeleteClick={setError} />
    </div>
  );
};
