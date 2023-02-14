import classNames from 'classnames';
import React, { useEffect } from 'react';

import { ErrorType } from '../../enums/ErrorType';

type Props = {
  errorType: ErrorType;
  isErrorShown: boolean;
  onNotificationClose: () => void;
};

export const ErrorNotification: React.FC<Props> = ({
  errorType,
  isErrorShown,
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
          hidden: !isErrorShown,
        },
      )}
    >
      <button
        type="button"
        className="delete"
        onClick={onNotificationClose}
        aria-label="Close notification about an error"
      />

      {errorMessage}
    </div>
  );
};
