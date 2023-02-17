import { useEffect, useState } from 'react';
import cn from 'classnames';
import { ErrorMessage } from '../../types/ErrorMessage';

type Props = {
  errorMessage: ErrorMessage | string,
};

export const Notification: React.FC<Props> = ({ errorMessage }) => {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const timerId = window.setTimeout(() => setIsHidden(true), 3000);

    return () => {
      window.clearTimeout(timerId);
    };
  }, []);

  return (
    <div
      className={cn('notification is-danger is-light has-text-weight-normal', {
        hidden: isHidden,
      })}
    >
      <button
        type="button"
        className="delete"
        aria-label="close error message"
        onClick={() => setIsHidden(true)}
      />

      {errorMessage}
    </div>
  );
};
