import React from 'react';
import classNames from 'classnames';

interface ErrorNotificationProps {
  errorMessage: string;
}

export const ErrorNotification: React.FC<ErrorNotificationProps> = ({
  errorMessage,
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
      <button data-cy="HideErrorButton" type="button" className="delete" />

      {errorMessage}
    </div>
  );
};
