import { useEffect, useState } from 'react';
import cn from 'classnames';
import { Error } from '../../types/Error';

type ErrorNotificationProps = {
  error: Error | '';
};

export const ErrorNotification: React.FC<ErrorNotificationProps> = ({
  error,
}) => {
  const [isErrorVisible, setIsErrorVisible] = useState(false);

  useEffect(() => {
    if (error) {
      setIsErrorVisible(true);
    }

    const timeoutId = setTimeout(() => {
      setIsErrorVisible(false);
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [error]);

  const handleHideError = () => {
    setIsErrorVisible(false);
  };

  return (
    <div
      data-cy="ErrorNotification"
      className={cn('notification is-danger is-light has-text-weight-normal', {
        hidden: !isErrorVisible,
      })}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={handleHideError}
      />
      {error}
    </div>
  );
};
