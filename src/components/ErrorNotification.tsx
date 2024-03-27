import { FC } from 'react';
import cn from 'classnames';
import { useTodos } from '../utils/TodosContext';

interface ErrorNotificationProps {
  error: { message: string } | null;
}

export const ErrorNotification: FC<ErrorNotificationProps> = ({ error }) => {
  const { setError } = useTodos();

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
