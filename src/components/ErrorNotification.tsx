import React from 'react';
import classNames from 'classnames';

interface ErrorNotificationProps {
  errorMessage: string;
  onClearError: () => void;
}

export const ErrorNotification: React.FC<ErrorNotificationProps> = ({
  errorMessage,
  onClearError,
}) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        { hidden: !errorMessage },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={onClearError}
      />

      {errorMessage}
    </div>
  );
};
