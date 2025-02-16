import classNames from 'classnames';
import React from 'react';
import { MessageError } from '../types/ErrorMessage';

interface Props {
  isError: boolean;
  errorMessage: MessageError;
  setIsError: (value: boolean) => void;
}

export const TodoError: React.FC<Props> = ({
  isError,
  errorMessage,
  setIsError,
}) => {
  const closeError = () => {
    setIsError(false);
  };

  return (
    <>
      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !isError },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={closeError}
        />
        {/* show only one message at a time */}
        {/* Unable to load todos
        <br />
        Title should not be empty
        <br />
        Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo */}
        {isError ? errorMessage : ''}
      </div>
    </>
  );
};
