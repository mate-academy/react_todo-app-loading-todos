import React, { useEffect } from 'react';
import classNames from 'classnames';
import { ErrorMessage } from '../enums/error';

type Props = {
  errorMessage: ErrorMessage,
  onCloseError: () => void,
};

export const Error: React.FC<Props> = ({
  errorMessage,
  onCloseError,
}) => {
  useEffect(() => {
    setTimeout(() => {
      onCloseError();
    }, 3000);
  }, []);

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
        aria-label="none"
        type="button"
        className="delete"
        onClick={onCloseError}
      >
        x
      </button>

      <>{errorMessage}</>
    </div>
  );
};
