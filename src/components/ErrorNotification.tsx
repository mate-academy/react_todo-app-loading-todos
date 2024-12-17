import React from 'react';
// import { ErrorStatus } from '../types/ErrorStatus';

type Props = {
  error: string;
  setError: (error: string) => void;
};

export const ErrorNotification: React.FC<Props> = props => {
  const { error, setError } = props;

  return (
    <div
      data-cy="ErrorNotification"
      className={`notification is-danger is-light has-text-weight-normal ${
        error ? '' : 'hidden'
      }`}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setError}
      />
      {error}
    </div>
  );
};
