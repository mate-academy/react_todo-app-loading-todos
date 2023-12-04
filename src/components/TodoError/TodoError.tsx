import React from 'react';
import { Errors } from '../../types/Errors';

type Props = {
  errorType: Errors | null,
  setErrorType: (error: Errors | null) => void,
};

export const TodoError: React.FC<Props> = ({
  errorType,
  setErrorType,
}) => {
  return (
    <div
      data-cy="ErrorNotification"
      className="notification is-danger is-light has-text-weight-normal"
    >
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setErrorType(null)}
      />
      {/* show only one message at a time */}
      {`${errorType}`}
    </div>
  );
};
