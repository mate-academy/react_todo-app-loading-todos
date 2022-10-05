import React from 'react';
import { Props } from './ErrorMessagePropTypes';

export const ErrorMasage : React.FC<Props> = ({
  errorType,
  setErrorMessage,
}) => {
  setTimeout(() => setErrorMessage(''), 3000);

  return (
    <div
      data-cy="ErrorNotification"
      className="notification is-danger is-light has-text-weight-normal"
    >
      <button
        aria-label="delete"
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setErrorMessage('')}
      />
      {`Unable to ${errorType}`}
      <br />
    </div>
  );
};
