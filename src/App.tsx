/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';

import { Todo } from './types/Todo';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { UserWarning } from './UserWarning';
import { Footer } from './components/Footer';
import { getTodos } from './api/todos';
import { ErrorMessages } from './components/ErrorMessages';

const USER_ID = 11895;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');
        setIsError(true);
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const isTodosLength = todos.length > 0;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList todos={filteredTodos} />

        {isTodosLength && (
          <Footer
            todos={todos}
            setFilteredTodos={setFilteredTodos}
          />
        )}

      </div>

      <ErrorMessages
        errorMessage={errorMessage}
        isError={isError}
        setIsError={setIsError}
      />
    </div>
  );
};
