/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Section } from './components/Section/Section';
import { Error } from './components/Error/Error';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';

const USER_ID = 11449;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(todos);

  function loadTodos() {
    getTodos(USER_ID)
      .then(response => {
        setTodos(response);
        setVisibleTodos(response);
      })
      .catch(() => setErrorMessage('Try again later'));
  }

  useEffect(loadTodos, [USER_ID]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  setTimeout(() => {
    setErrorMessage('');
  }, 3000);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">

        <Header todos={!!todos} />

        {visibleTodos && (
          <Section
            visibleTodos={visibleTodos}
          />
        )}

        {!!todos.length && (
          <Footer
            todos={todos}
            setVisibleTodos={setVisibleTodos}
          />
        )}

      </div>

      {errorMessage && (
        <Error
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      )}
    </div>
  );
};
