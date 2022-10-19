import classNames from 'classnames';
import React, { useState, useEffect } from 'react';

type Props = {
  error: string | null,
  setError: (error: string | null) => void,
};

export const TodoError: React.FC<Props> = ({ error, setError }) => {
  const [notification, setNotification] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setError(null);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [error, notification]);

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: notification },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        aria-label="delete"
        onClick={() => setNotification(true)}
      />
      <span>{error}</span>
    </div>
  );
};
