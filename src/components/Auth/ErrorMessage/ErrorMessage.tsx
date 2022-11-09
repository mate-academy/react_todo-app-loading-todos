/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { ErrorType } from '../../../utils/enums/ErrorType';

type Props = {
  onClose: (errorStatus: boolean) => void;
  isError: boolean;
  errorType: ErrorType;
};

export const ErrorMessage: React.FC<Props> = ({
  onClose,
  isError,
  errorType,
}) => {
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    switch (errorType) {
      case ErrorType.Add:
        setErrorMessage('Unable to add a todo');
        break;

      case ErrorType.Delete:
        setErrorMessage('Unable to delete a todo');
        break;

      case ErrorType.Update:
        setErrorMessage('Unable to update a todo');
        break;

      default: setErrorMessage('');
    }
  }, [errorType]);

  return (
    <div
      data-cy="ErrorNotification"
      className="notification is-danger is-light has-text-weight-normal"
      hidden={!isError}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => onClose(false)}
      />

      {errorMessage}
    </div>
  );
};
