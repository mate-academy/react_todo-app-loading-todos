import React, { useEffect } from 'react';
import cn from 'classnames';

type Props = {
  errorMessage: string;
  setErrorMessage: (error: string) => void;
};

const ErrorNotification: React.FC<Props> = ({
  errorMessage,
  setErrorMessage,
}) => {
  // Проверка наличия ошибки, и её удаления
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(''), 3000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage, setErrorMessage]);

  return (
    <div
      data-cy="ErrorNotification"
      className={cn('notification is-danger is-light has-text-weight-normal', {
        hidden: errorMessage.length === 0,
      })}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setErrorMessage('')}
      />
      {/* show only one message at a time */}
      {errorMessage}
    </div>
  );
};

export default ErrorNotification;
