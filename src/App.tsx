/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-console */
import React from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { Todos } from './components/Todos';
import { Header } from './components/Header';
import { Footer } from './components/Footer/Footer';
import { ErrorWarning } from './components/ErrorWarning';

export const App: React.FC = () => {
  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <Header />
        <Todos />
        <Footer />
      </div>
      <ErrorWarning />
    </div>
  );
};
