import classNames from 'classnames';
import React from 'react';

interface ErrorNotificationProps {
  errorMessage: string;
  onClose: () => void;
}

export const ErrorNotification: React.FC<ErrorNotificationProps> = ({
  errorMessage,
  onClose,
}) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        {
          hidden: !errorMessage,
        },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={onClose}
      />
      {errorMessage}
    </div>
  );
};
