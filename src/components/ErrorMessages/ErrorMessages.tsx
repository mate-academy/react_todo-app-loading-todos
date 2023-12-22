import React, { useContext } from 'react';
import classNames from 'classnames';
import { TodosContext } from '../TododsContext/TodosContext';

export const ErrorMessages: React.FC = () => {
  const { errorMessage, setErrorMessage } = useContext(TodosContext);

  let isErrorHidden = true;

  if (errorMessage !== '') {
    isErrorHidden = false;
    setTimeout(() => {
      setErrorMessage('');
      isErrorHidden = true;
    }, 3000);
  }

  return (
    // {/* Notification is shown in case of any error */}
    // {/* Add the 'hidden' class to hide the message smoothly */}
    <div
      data-cy="ErrorNotification"
      className={classNames('notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal', {
          hidden: isErrorHidden,
        })}
    >
      {/* eslint-disable-next-line */}
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => {
          isErrorHidden = true;
        }}
      />
      {/* show only one message at a time */}
      {errorMessage}
    </div>
  );
};
