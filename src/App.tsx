/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { TodoContext } from './context/TodoContext';
import { ERROR_TYPE } from './consts/constants';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';

export const App: React.FC = () => {
  const { error, handleCloseError } = React.useContext(TodoContext);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        <TodoList />
        <Footer />
      </div>

      <div
        data-cy="ErrorNotification"
        className={`notification is-danger ${error === ERROR_TYPE.NONE ? 'hidden' : ''} is-light has-text-weight-normal`}
      >
        <button
          data-cy="HideErrorButton"
          onClick={handleCloseError}
          type="button"
          className="delete"
        />
        {error === ERROR_TYPE.LOAD && `Unable to load todos`}
        {error === ERROR_TYPE.TITLE && `Title should not be empty`}
        {error === ERROR_TYPE.ADD && `Unable to add a todo`}
        {error === ERROR_TYPE.DELETE && `Unable to delete a todo`}
        {error === ERROR_TYPE.UPDATE && `Unable to update a todo`}
        <br />
      </div>
    </div>
  );
};
