import React, { useEffect } from 'react';
import { Props } from './ErrorMessagePropTypes';

export const ErrorMasage : React.FC<Props> = ({
  errorType,
  setErrorMessage,
}) => {
  let timer : ReturnType<typeof setTimeout>;

  // Will Mount ↓

  useEffect(() => {
    timer = setTimeout(() => setErrorMessage(''), 3000);
  }, []);

  // Will Unmount ↓

  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  }, []);

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
