/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { getTodos } from './api/todos';
import { ErrorNotification } from './components/ErrorNotification';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Todolist } from './components/Todolist';
import { Todo } from './types/Todo';
import { UserWarning } from './UserWarning';

const USER_ID = 6438;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [hasError, setHasError] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [errorType, setErrorType] = useState('');

  const getTodosFromServer = async () => {
    try {
      const response = await getTodos(USER_ID);

      setTodos(response);
    } catch (error) {
      setHasError(true);
      setErrorType('upload');
    }
  };

  useEffect(() => {
    getTodosFromServer();
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          todos={todos}
          userId={USER_ID}
        />

        { !!todos.length && (
          <>
            <Todolist
              todos={todos}
              setHasCompleted={setHasCompleted}
              selectedFilter={selectedFilter}
            />

            <Footer
              todos={todos}
              hasCompleted={hasCompleted}
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
            />
          </>
        ) }
      </div>

      { hasError && (
        <ErrorNotification
          errorType={errorType}
          hasError={hasError}
          setHasError={setHasError}
        />
      ) }
    </div>
  );
};
