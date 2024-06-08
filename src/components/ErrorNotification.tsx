import React from 'react';

export const ErrorNotification: React.FC<{
  isError: string | null;
  setIsError: (value: string | null) => void;
}> = ({ isError, setIsError }) => (
  <div
    data-cy="ErrorNotification"
    className={`notification is-danger is-light has-text-weight-normal ${isError ? '' : 'hidden'}`}
  >
    <button
      data-cy="HideErrorButton"
      type="button"
      className="delete"
      onClick={() => setIsError(null)}
    />
    {isError}
  </div>
);
