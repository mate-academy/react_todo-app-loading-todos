import React from 'react';
import classNames from 'classnames';
import { Error } from '../../types/Error';

type Props = {
  errorMessage: Error;
  showError: boolean;
  setError: (value: boolean) => void;
};

export const Errors: React.FC<Props> = ({
  errorMessage,
  showError,
  setError,
}) => {
  const errorString = `Unable to ${errorMessage} a todo`;

  const handleCloseButtonClick = () => {
    setError(false);
  };

  return (
    <div className={classNames(
      'notification',
      'is-danger',
      'is-light',
      'has-text-weight-normal',
      {
        hidden: !showError,
      },
    )}
    >
      <button
        type="button"
        className="delete"
        aria-label="Delete"
        onClick={() => handleCloseButtonClick()}
      />

      {errorString}
    </div>
  );
};
