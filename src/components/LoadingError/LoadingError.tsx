import React from 'react';

type Props = {
  error: boolean;
  setError: (parameter: boolean) => void,
};

export const LoadingError: React.FC<Props> = ({ error, setError }) => {
  const hideError = () => {
    setError(false);
  };

  if (error) {
    setTimeout(() => {
      setError(false);
    }, 3000);
  }

  return (
    <div
      data-cy="ErrorNotification"
      className="notification is-danger is-light has-text-weight-normal"
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        aria-label="delete"
        onClick={hideError}
      />

      {error && 'Unable to add a todo'}
      <br />
      {error && 'Unable to delete a todo'}
      <br />
      {error && 'Unable to update a todo'}
    </div>
  );
};
