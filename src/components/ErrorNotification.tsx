import React from 'react';

export const ErrorNotification: React.FC<{
  isError: string | null;
  onSetError: (value: string | null) => void;
}> = ({ isError, onSetError }) => (
  <div
    data-cy="ErrorNotification"
    className={`notification is-danger is-light has-text-weight-normal ${isError ? '' : 'hidden'}`}
  >
    <button
      data-cy="HideErrorButton"
      type="button"
      className="delete"
      onClick={() => onSetError(null)}
    />
    {isError}
  </div>
);
