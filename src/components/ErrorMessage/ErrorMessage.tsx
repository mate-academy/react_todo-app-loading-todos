import React, { useState, useEffect } from 'react';
import { ErrorType } from '../../types/ErrorType';

type Props = {
  errorType: string;
  setErrorType: (errorType: string) => void;
};

export const ErrorMessage: React.FC<Props> = ({ errorType, setErrorType }) => {
  const [wait, setWait] = useState(false);

  let ErrorMessageText = '';

  switch (errorType) {
    case ErrorType.empty:
      ErrorMessageText = 'Please enter title';
      break;

    case ErrorType.delete:
      ErrorMessageText = 'Unable to delete a todo';
      break;

    case ErrorType.add:
      ErrorMessageText = 'Unable to add a todo';
      break;

    case ErrorType.update:
      ErrorMessageText = 'Unable to update a todo';
      break;

    case ErrorType.get:
      ErrorMessageText = 'Unable to get todos';
      break;

    case ErrorType.create:
      ErrorMessageText = 'Unable to create a todo';
      break;

    default:
      ErrorMessageText = '';
      break;
  }

  const handleHideError = () => {
    setErrorType('');
  };

  useEffect(() => {
    if (errorType) {
      setWait(true);
      setTimeout(() => {
        setWait(false);
      }, 3000);
    }
  }, [errorType]);

  return (
    <>
      {wait && (
        <div
          data-cy="ErrorNotification"
          className="notification is-danger is-light has-text-weight-normal"
        >
          <button
            aria-label="Close"
            data-cy="HideErrorButton"
            type="button"
            className="delete"
            onClick={handleHideError}
          />
          {ErrorMessageText}
          <br />
        </div>
      )}
    </>
  );
};
