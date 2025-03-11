import React, { useEffect } from 'react';

interface ErrorNotificationProps {
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

const ErrorNotification: React.FC<ErrorNotificationProps> = ({
  error,
  setError,
}) => {
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error, setError]);

  return (
    <div
      data-cy="ErrorNotification"
      className={`notification is-danger ${error === null ? 'hidden' : ''}`}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setError(null)}
      />
      {error || ''}
    </div>
  );
};

export default ErrorNotification;
