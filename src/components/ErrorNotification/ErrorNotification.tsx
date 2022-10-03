import React from 'react';

type Props = {
  setError: (err: boolean) => void;
};

export const ErrorNotification: React.FC<Props> = ({ setError }) => {
  return (
    <div
      data-cy="ErrorNotification"
      className="notification is-danger is-light has-text-weight-normal"
    >
      <button
        aria-label="delete"
        data-cy="v"
        type="button"
        className="delete"
        onClick={() => setError(false)}
      />

      Error
    </div>
  );
};
