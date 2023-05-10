import React, { useEffect } from 'react';
import classNames from 'classnames';
import { ErrorMessage } from '../../types/ErrorMessage';

type Props = {
  errorMessage: ErrorMessage;
  isErrorShown: boolean;
  onErrorClose: () => void;
};

export const Error: React.FC<Props> = ({
  errorMessage,
  isErrorShown,
  onErrorClose,
}) => {
  const errorString = `Unable to ${errorMessage} a todo`;

  useEffect(() => {
    setTimeout(() => onErrorClose(), 3000);
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
        onClick={onErrorClose}
        aria-label="Close error message"
      />

      {errorString}
    </div>
  );
};
