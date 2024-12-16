import cn from 'classnames';
import { useEffect } from 'react';

type Props = {
  error: string;
  clearError: () => void;
};

export const ErrorNotification: React.FC<Props> = ({ error, clearError }) => {
  useEffect(() => {
    if (error !== '') {
      const timer = setTimeout(() => {
        clearError();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  return (
    <div
      data-cy="ErrorNotification"
      className={cn('notification is-danger is-light has-text-weight-normal', {
        hidden: error === '',
      })}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={clearError}
      />
      {error}
    </div>
  );
};
