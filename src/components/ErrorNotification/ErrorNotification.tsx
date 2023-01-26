import React, { memo, useEffect } from 'react';
import { Error } from '../../types/Errors';

interface Props {
  message: Error,
  setMessage: (message: Error) => void,
}

export const ErrorNotification: React.FC<Props> = memo((props) => {
  const {
    message,
    setMessage,
  } = props;

  useEffect(() => {
    setTimeout(() => {
      setMessage(Error.None);
    }, 3000);
  }, [setMessage]);

  return (
    <div
      data-cy="ErrorNotification"
      className="notification is-danger is-light has-text-weight-normal"
    >
      {/* eslint-disable jsx-a11y/control-has-associated-label */}
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setMessage(Error.None)}
      />
      {message}
    </div>
  );
});
