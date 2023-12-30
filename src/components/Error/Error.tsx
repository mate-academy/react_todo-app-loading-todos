import React from 'react';
import { ErrorType } from '../../types/ErrorTypes';

type Props = {
  errorMessage: ErrorType;
};

export const Error: React.FC<Props> = (
  {
    errorMessage,
  },
) => {
  return (
    <div
      data-cy="ErrorNotification"
      className="notification is-danger is-light has-text-weight-normal"
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        aria-label="HideErrorButton"
      />
      {errorMessage}
    </div>
  );
};
