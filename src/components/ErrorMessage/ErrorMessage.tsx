import React from 'react';
import { Props } from './ErrorMessagePropTypes';

export const ErrorMasage : React.FC<Props> = ({ errorType, setErrorType }) => {
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
        onChange={() => setErrorType('')}
      />
      {`Unable to ${errorType}`}
      <br />
    </div>
  );
};
