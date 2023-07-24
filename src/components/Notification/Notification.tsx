import React, { useEffect } from 'react';

type Props = {
  error: string;
  setError: (error: string) => void;
};

export const Notification: React.FC<Props> = (
  { error, setError },
) => {
  useEffect(() => {
    const timeout = setTimeout(() => setError(''), 3000);

    return () => clearTimeout(timeout);
  }, [error]);

  return (
    <div className="notification is-danger is-light has-text-weight-normal">
      <button
        type="button"
        className="delete"
        aria-label="close notification"
        onClick={() => setError('')}
      />
      {error}
    </div>
  );
};
