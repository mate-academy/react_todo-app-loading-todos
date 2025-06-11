import classNames from 'classnames';
import React, { useEffect } from 'react';

interface ErrorNotificationProps {
  errorMessage: string;
  onErrorMessage: (errorMessage: string) => void;
}

export const ErrorNotification: React.FC<ErrorNotificationProps> = ({
  errorMessage,
  onErrorMessage,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => onErrorMessage(''), 3000);

    return () => clearTimeout(timer);
  });

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
        onClick={() => onErrorMessage('')}
      />
      {/* show only one message at a time */}
      {errorMessage}
      {/* Unable to load todos
        <br />
        Title should not be empty
        <br />
        Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo */}
    </div>
  );
};
