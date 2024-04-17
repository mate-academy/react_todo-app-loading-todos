/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { TodoProvider } from './Components/TodoContext/TodoContext';
import { Header } from './Components/Header/Header';
import { TodoList } from './Components/TodoList/TodoList';
import { Footer } from './Components/Footer/Footer';
import { ErrorsNotify } from './Components/ErrorsNotify/ErrorsNotify';

export const App: React.FC = () => {
  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <TodoProvider>
        <div className="todoapp">
          <h1 className="todoapp__title">todos</h1>

          <div className="todoapp__content">
            <Header />
            <TodoList />
            <Footer />
          </div>
          <ErrorsNotify />
        </div>
      </TodoProvider>
    </div>
  );
};
