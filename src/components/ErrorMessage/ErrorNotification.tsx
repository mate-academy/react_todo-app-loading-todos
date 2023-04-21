import React from 'react';
import { ErrorMessage } from '../../types/ErrorMessage';
import classNames from 'classnames';

type Props = {
  errorMessage: ErrorMessage,
  closeError: () => void,
};

export const ErrorNotification: React.FC<Props> = ({errorMessage,
  closeError,}) => {
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
        onClick={closeError}
      >
        ×
      </button>

      <>{errorMessage}</>
    </div>
  );
}