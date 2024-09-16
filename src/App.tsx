/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useEffect, useState } from 'react';
import { StateContext } from './Store';
import { Header } from './Components/Header/Header';
import { TodoList } from './Components/TodoList/TodoList';
import classNames from 'classnames';
import { Footer } from './Components/Footer/Footer';
import { wait } from './utils/fetchClient';

export const App: React.FC = () => {
  const { errorLoad } = useContext(StateContext);
  const [isErrorLoading, setIsErrorLoading] = useState(errorLoad);

  useEffect(() => {
    setIsErrorLoading(errorLoad);
  }, [errorLoad]);

  const hideErrorMessage = () => {
    setIsErrorLoading('');
  };

  wait(3000).then(() => {
    setIsErrorLoading('');
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        <TodoList />
        <Footer />
      </div>

      {/* DON'T use conditional rendering to hide the notification + */}
      {/* Add the 'hidden' class to hide the message smoothly +*/}

      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          {
            hidden: !isErrorLoading,
          },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={hideErrorMessage}
        />
        {/* show only one message at a time +*/}
        {/* Unable to load todos */}
        {errorLoad}
        {/* <br /> */}
        {/* Title should not be empty */}
        {/* <br /> */}
        {/* Unable to add a todo */}
        {/* <br /> */}
        {/* Unable to delete a todo */}
        {/* <br /> */}
        {/* Unable to update a todo */}
      </div>
    </div>
  );
};
