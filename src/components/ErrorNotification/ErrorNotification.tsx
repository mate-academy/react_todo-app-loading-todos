import classNames from 'classnames';
import React, { useEffect } from 'react';

type Props = {
  errorMessage: string;
  clearError: () => void;
};

export const ErrorNotification: React.FC<Props> = ({
  errorMessage,
  clearError,
}) => {
  useEffect(() => {
    const timerId = setTimeout(() => {
      clearError();
    }, 3000);

    return () => {
      clearTimeout(timerId);
    };
  }, [errorMessage, clearError]);

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !errorMessage },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={clearError}
      />
      {errorMessage}
      {/*Unable to load todos
      <br />
      Title should not be empty
      <br />
      Unable to add a todo
      <br />
      Unable to delete a todo
      <br />
      Unable to update a todo*/}
    </div>
  );
};
