import React from 'react';
import { Errors } from '../../types/Errors';

type Props = {
  text: string
  setShowError: (value: Errors) => void,
};

export const ErrorNotification: React.FC<Props> = ({
  text,
  setShowError,
}) => {
  return (
    <div
      data-cy="ErrorNotification"
      className="notification is-danger is-light has-text-weight-normal"
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setShowError(Errors.None)}
      >
        {}
      </button>

      {`Unable to ${text} a todo`}
    </div>
  );
};
