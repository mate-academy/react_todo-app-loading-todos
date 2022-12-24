import React from 'react';
import { ErrorMessage } from '../../types/ErrorMessage';

interface Props {
  onErrorsChange: (value: ErrorMessage) => void,
  visibleError: ErrorMessage,
}

export const Errors: React.FC<Props> = (
  {
    onErrorsChange,
    visibleError,
  },
) => {
  setTimeout(() => onErrorsChange(ErrorMessage.None), 3000);

  return (
    <div
      data-cy="ErrorNotification"
      className="notification is-danger is-light has-text-weight-normal"
    >
      <button
        aria-label="Delete error"
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => onErrorsChange(ErrorMessage.None)}
      />
      {visibleError}
    </div>
  );
};
