import React, { useEffect } from 'react';

type Props = {
  setError: (err: boolean) => void;
  error: boolean;
};

export const ErrorNotification: React.FC<Props> = ({ setError, error }) => {
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setError(false);
    }, 3000);

    const clear = (() => clearTimeout(timeOut));

    return clear;
  });

  return (
    <div
      data-cy="ErrorNotification"
      className="notification is-danger is-light has-text-weight-normal"
      hidden={!error}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        aria-label="label"
        className="delete"
        onClick={() => setError(false)}
      />

      {error && 'Wrong URL'}
    </div>
  );
};
