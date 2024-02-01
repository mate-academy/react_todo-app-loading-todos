/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer } from './components/Footer';
import { Errors } from './components/Errors';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { Status } from './types/Status';

const USER_ID = 56;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterBy, setFilter] = useState(Status.All);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');
        setIsError(true);
      });
  }, []);

  const filterTodos = (allTodos: Todo[]) => {
    switch (filterBy) {
      case Status.Active:
        return allTodos.filter((todo) => !todo.completed);

      case Status.Completed:
        return allTodos.filter((todo) => todo.completed);

      default:
        return allTodos;
    }
  };

  const filteredTodos = filterTodos(todos);

  useEffect(() => {
    const timeoutId = 0;

    if (errorMessage) {
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [errorMessage]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          setTodos={setTodos}
          setErrorMessage={setErrorMessage}
          setIsError={setIsError}
          ID={USER_ID}
        />

        <Main todos={filteredTodos} />
        {todos.length > 0 && (
          <>
            <Footer
              filterBy={filterBy}
              setFilter={setFilter}
              todos={todos}
            />
          </>
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      {isError && (
        <Errors
          errorMessage={errorMessage}
          setIsError={() => setIsError(false)}
          isHidden={!isError}
        />
      )}
    </div>
  );
};
