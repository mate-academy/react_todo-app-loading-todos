import classNames from 'classnames';
import React, { useEffect } from 'react';
import { ErrorType } from '../../types/ErrorType';

type Props = {
  errorMessage: ErrorType;
  onCloseError: () => void;
  hasError: boolean;
};

export const ErrorNotification: React.FC<Props> = ({
  errorMessage,
  onCloseError,
  hasError,
}) => {
  useEffect(() => {
    setTimeout(() => {
      onCloseError();
    }, 3000);
  }, []);

  return (
    <div
      className={classNames('notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        { hidden: !hasError })}
    >
      <button
        type="button"
        className="delete"
        onClick={onCloseError}
      >
        x
      </button>

      {errorMessage}
    </div>
  );
};
