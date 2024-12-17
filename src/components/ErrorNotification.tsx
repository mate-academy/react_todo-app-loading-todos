import React, { useEffect } from 'react';
import cn from 'classnames';

type Props = {
  error: string;
  setError: (massege: string) => void;
};

export const ErrorNotification: React.FC<Props> = props => {
  const { error, setError } = props;

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 3000);

      return () => clearTimeout(timer);
    }
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
        onClick={() => setError('')}
      />
      {error}
    </div>
  );
};
