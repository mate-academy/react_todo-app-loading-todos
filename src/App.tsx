/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { ErrorNotification } from './components/ErrorNotification';
import { Filters } from './types/Filters';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Header } from './components/Header';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [errorTodos, setErrorTodos] = useState('');
  const [status, setStatus] = useState(Filters.All);

  const handleErrorClose = () => {
    setErrorTodos('');
  };

  const visibleTodos = todos?.filter(todo => {
    switch (status) {
      case Filters.Completed:
        return todo.completed;
      case Filters.Active:
        return todo.completed === false;
      default:
        return true;
    }
  });

  const activeTodos = todos?.filter(todo => !todo.completed);

  useEffect(() => {
    getTodos()
      .then(data => setTodos(data))
      .catch(error => {
        setErrorTodos('Unable to load todos');
        throw new Error(error);
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        {/* Hide the footer if there are no todos */}

        {todos?.length && (
          <>
            <TodoList todos={visibleTodos} />
            <Footer
              activeTodos={activeTodos}
              status={status}
              setStatus={setStatus}
            />
          </>
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      {/* show only one message at a time */}

      <ErrorNotification
        error={errorTodos}
        handleErrorClose={handleErrorClose}
      />
    </div>
  );
};
