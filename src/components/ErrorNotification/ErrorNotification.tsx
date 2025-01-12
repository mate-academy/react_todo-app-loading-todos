import React from 'react';

interface Props {
  error: string | null;
  setError: (error: string | null) => void;
}

export const ErrorNotification: React.FC<Props> = ({ error, setError }) => (
  <div
    data-cy="ErrorNotification"
    className={`notification is-danger is-light has-text-weight-normal ${error ? '' : 'hidden'}`}
  >
    <button
      data-cy="HideErrorButton"
      type="button"
      className="delete"
      onClick={() => setError(null)}
    />
    {/* show only one message at a time */}
    {error}
  </div>
);
