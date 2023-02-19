import React, { useEffect } from 'react';
import classNames from 'classnames';
import { ErrorType } from '../types/ErrorType';

type Props = {
  errorType: ErrorType;
  hasError: boolean;
  onNotificationClose: () => void;
};

export const ErrorNotification: React.FC<Props> = ({
  errorType,
  hasError,
  onNotificationClose,
}) => {
  const errorMessage = `Unable to ${errorType} a todo`;

  useEffect(() => {
    setTimeout(() => onNotificationClose(), 3000);
  }, []);

  return (
    <div
      className={classNames(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        {
          hidden: !hasError,
        },
      )}
    >
      <button
        type="button"
        className="delete"
        onClick={onNotificationClose}
        aria-label="Close erroe notification"
      />

      {errorMessage}
    </div>
  );
};
