import React, { useEffect, useState } from 'react';

interface ErrorNotificationProps {
  error: string | null;
  onClearError: () => void;
}

export const ErrorNotification: React.FC<ErrorNotificationProps> = ({
  error,
  onClearError,
}) => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (error) {
      setHidden(false);
      const timer = setTimeout(() => {
        setHidden(true);
        setTimeout(onClearError, 1000);
      }, 4000);

      return () => clearTimeout(timer);
    }
    return undefined;
  }, [error, onClearError]);

  return (
    <div
      data-cy="ErrorNotification"
      className={`notification is-danger is-light has-text-weight-normal ${hidden ? 'hidden' : ''}`}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => {
          setHidden(true);
          setTimeout(onClearError, 1000);
        }}
      />
      {error}
    </div>
  );
};
