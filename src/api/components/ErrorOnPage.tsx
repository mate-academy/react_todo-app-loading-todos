import React, { useEffect } from 'react';

type Props = {
  error: string | null,
  setNewError: (error: string | null) => void,
};

export const ErrorOnPage: React.FC<Props> = ({
  error,
  setNewError,
}) => {
  useEffect(() => {
    setTimeout(() => {
      setNewError(null);
    }, 3000);
  }, []);

  return (
    <div className="notification is-danger is-light has-text-weight-normal">
      <button
        type="button"
        className="delete"
        onClick={() => setNewError(null)}
        aria-label="closeBtn"
      />
      {error}
    </div>
  );
};
