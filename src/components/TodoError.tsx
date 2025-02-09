import React, { useEffect } from 'react';
import cn from 'classnames';
import { ErrorTypes } from '../types/ErrorTypes';
type Props = {
  error: ErrorTypes;
  setError: (error: ErrorTypes) => void;
};

export const TodoError: React.FC<Props> = ({ error, setError }) => {
  useEffect(() => {
    if (error === ErrorTypes.Empty) {
      return;
    }

    const timer = setTimeout(() => {
      setError(ErrorTypes.Empty);
    }, 3000);

    return () => clearTimeout(timer);
  }, [error, setError]);

  return (
    <div
      data-cy="ErrorNotification"
      className={cn('notification is-danger is-light has-text-weight-normal', {
        hidden: !error,
      })}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setError(ErrorTypes.Empty)}
      />
      {error}
    </div>
  );
};
