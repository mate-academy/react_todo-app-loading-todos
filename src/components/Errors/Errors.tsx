import React, { useEffect } from 'react';
import cn from 'classnames';
import { Error } from '../../types/TypeOfErrors';

interface Props {
  error: Error | null,
  setError: (value: Error | null) => void;
}

export const Errors: React.FC<Props> = ({
  error,
  setError,
}) => {
  useEffect(() => {
    setTimeout(() => {
      setError(null);
    }, 3000);
  }, [error]);

  return (
    <div
      data-cy="ErrorNotification"
      className={cn(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        { hidden: !error },
      )}
    >
      <button
        aria-label="deleteError"
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setError(null)}
      />
      {error}
    </div>
  );
};
