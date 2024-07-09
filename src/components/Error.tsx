import { FC, useEffect } from 'react';
import cn from 'classnames';

interface Props {
  message: string;
  onClose: (message: string) => void;
}

export const Error: FC<Props> = ({ message, onClose }) => {
  useEffect(() => {
    const timeout = setTimeout(onClose, 3000);

    return () => clearTimeout(timeout);
  }, [message]);

  return (
    <div
      data-cy="ErrorNotification"
      className={cn('notification is-danger is-light has-text-weight-normal', {
        hidden: !message,
      })}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className={`delete ${!message && 'hidden'}`}
        onClick={() => onClose('')}
      />
      {/* show only one message at a time */}
      {message}
    </div>
  );
};
