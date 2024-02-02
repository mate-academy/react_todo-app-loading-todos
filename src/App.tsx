/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
// eslint-disable-next-line import/no-cycle
import { TodoList } from './components/TodoList';
// eslint-disable-next-line import/no-cycle
import { TodoContext } from './components/TodosContext';
import { TodoContextProps } from './types/TodosContextProps';
// eslint-disable-next-line import/no-cycle
import { Footer } from './components/Footer';
import { Header } from './components/Header';

export const USER_ID = 94;

export const App: React.FC = () => {
  const {
    todos,
    errorMessage,
    setErrorMessage,
  }:TodoContextProps = useContext(TodoContext);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {todos && <TodoList />}

        {todos.length > 0 && <Footer />}
      </div>

      <div
        data-cy="ErrorNotification"
        className={
          classNames('notification is-danger is-light has-text-weight-normal',
            { hidden: !errorMessage })
        }
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage('')}
        />

        {errorMessage}
      </div>
    </div>
  );
};
