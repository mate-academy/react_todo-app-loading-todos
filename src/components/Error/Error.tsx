import React, { useEffect } from 'react';
import classNames from 'classnames';
import { ErrorMessage } from '../../types/ErrorMessage';

type Props = {
  errorMessage: ErrorMessage;
  isError: boolean;
  onClose: () => void;
};

export const Error: React.FC<Props> = ({
  errorMessage,
  isError,
  onClose,
}) => {
  const errorString = `Unable to ${errorMessage} a todo`;

  useEffect(() => {
    const errorTimeOut = setTimeout(() => onClose(), 3000);

    return () => {
      clearTimeout(errorTimeOut);
    };
  }, [isError]);

  return (
    <div
      className={classNames(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
      )}
      hidden={!isError}
    >
      <button
        type="button"
        className="delete"
        onClick={onClose}
        aria-label="Close error message"
      />

      {errorString}
    </div>
  );
};
