/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { UserWarning } from './UserWarning';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Section } from './components/Section/Section';
import { Error } from './components/Error/Error';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';

const USER_ID = 11449;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);

  getTodos(USER_ID)
    .then(response => setTodos(response));

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {todos && (
          <>
            <Section todos={todos} />

            <Footer />
          </>
        )}

      </div>

      <Error />
    </div>
  );
};
