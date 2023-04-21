import React, { useEffect } from 'react';
import classNames from 'classnames';
import { ErrorMessage } from '../../types/ErrorMessage';

type Props = {
  errorMessage: ErrorMessage;
  onCloseError: () => void;
};

export const ErrorNotification: React.FC<Props> = ({
  errorMessage,
  onCloseError,
}) => {
  useEffect(() => {
    setTimeout(() => {
      onCloseError();
    }, 3000);
  }, [onCloseError]);

  return (
    <div
      className={classNames(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        { hidden: !errorMessage },
      )}
    >
      <button
        type="button"
        className="delete"
        onClick={onCloseError}
      >
        ×
      </button>

      <>{errorMessage}</>
    </div>
  );
};
