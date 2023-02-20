import React, { useEffect } from 'react';
import classNames from 'classnames';
import { PossibleError } from '../../types/PossibleError';

type Props = {
  possibleError: PossibleError;
  isError: boolean;
  onErrorNotificationClose: () => void;
};

export const ErrorNotification: React.FC<Props> = ({
  possibleError,
  isError,
  onErrorNotificationClose,
}) => {
  const errorMessage = `Unable to ${possibleError} a todo`;

  useEffect(() => {
    setTimeout(() => onErrorNotificationClose(), 3000);
  }, []);

  return (
    <div
      className={classNames(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        {
          hidden: !isError,
        },
      )}
    >
      <button
        type="button"
        className="delete"
        onClick={onErrorNotificationClose}
        aria-label="Close error notification"
      />
      {errorMessage}
    </div>
  );
};
