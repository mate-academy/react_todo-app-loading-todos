import { FC, useEffect } from 'react';
import cn from 'classnames';
import { useTodos } from '../utils/TodosContext';
import { Error } from '../types';

interface ErrorNotificationProps {
  error: Error;
}

export const ErrorNotification: FC<ErrorNotificationProps> = ({ error }) => {
  const { setError } = useTodos();

  useEffect(() => {
    const clearError = setTimeout(() => {
      setError(null);
    }, 3000);

    return () => clearTimeout(clearError);
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
        onClick={() => setError(null)}
      />
      <p>{error?.message}</p>
    </div>
  );
};
