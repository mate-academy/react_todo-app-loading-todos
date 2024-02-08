import React, { useContext } from 'react';
import { UserWarning } from './UserWarning';

import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer } from './components/Footer';
import { Error } from './components/Error';
import { StateContext } from './management/TodoContext';

import { USER_ID } from './api/todos';

export const App: React.FC = () => {
  const { todos } = useContext(StateContext);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        <Main />
        {todos.length > 0 && <Footer />}
      </div>

      <Error />
    </div>
  );
};
