import React from 'react';
import { Errors } from '../../types/Errors';

type Props = {
  showError: string
  setShowError: (str: string) => void,
};

export const ErrorNotification: React.FC<Props> = ({
  showError,
  setShowError,
}) => {
  return (
    <div
      data-cy="ErrorNotification"
      className="notification is-danger is-light has-text-weight-normal"
      hidden={showError === ''}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setShowError(Errors.None)}
      >
        {}
      </button>

      {`Unable to ${showError} a todo`}
    </div>
  );
};
