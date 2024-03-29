import React, { useEffect, useState } from 'react';

import { useError } from './context/ErrorContext';

import cn from 'classnames';

export const ErrorNotification: React.FC = () => {
  const { errorMessage, setErrorMessage } = useError();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (errorMessage) {
      setIsVisible(true);
    }

    const delay = setTimeout(() => {
      setIsVisible(false);
      setErrorMessage('');
    }, 3000);

    return () => clearTimeout(delay);
  }, [errorMessage, setErrorMessage]);

  const handleCloseError = () => {
    setIsVisible(false);
  };

  return (
    <div
      data-cy="ErrorNotification"
      className={cn('notification is-danger is-light has-text-weight-normal', {
        hidden: !isVisible,
      })}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={handleCloseError}
      />
      {errorMessage}
    </div>
  );
};
