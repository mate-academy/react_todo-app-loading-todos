import React, { useEffect } from 'react';
import classNames from 'classnames';
import { ErrorMessage } from '../Enum/ErrorMessage';

type Props = {
  error: ErrorMessage,
  setError: React.Dispatch<React.SetStateAction<ErrorMessage>>,
};

export const ErrorNotification: React.FC<Props> = ({
  error,
  setError,
}) => {
  const closeErrorMessage = () => {
    setError(ErrorMessage.NONE);
  };

  useEffect(() => {
    setTimeout(() => {
      setError(ErrorMessage.NONE);
    }, 3000);
  }, [error, setError]);

  return (
    <>
      {error && (
        <div className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: ErrorMessage.NONE },
        )}
        >
          <button
            type="button"
            aria-label="close ErrorMessage"
            className="delete"
            onClick={closeErrorMessage}
          />
          {error}
        </div>
      )}
    </>
  );
};
