import React from 'react';
import cn from 'classnames';
import type { ErrorMessage } from '../types/ErrorsMessage';

type Props = {
  error: ErrorMessage | null;
  setError: (error: ErrorMessage | null) => void;
};

export default function Errors({ error, setError }: Props) {
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
      {error}
    </div>
  );
}