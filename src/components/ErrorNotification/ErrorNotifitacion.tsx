import React, { useEffect } from 'react';

import { ErrorMessage } from '../../enums/ErrorMessage';

type Props = {
  errorMessage: ErrorMessage;
  setErrorMessage: (value: ErrorMessage) => void;
};

export const ErrorNotification: React.FC<Props> = ({
  errorMessage,
  setErrorMessage,
}) => {
  useEffect(() => {
    setTimeout(() => setErrorMessage(ErrorMessage.NONE), 3000);
  }, []);

  return (
    <div className="notification is-danger is-light has-text-weight-normal">
      <button
        type="button"
        className="delete"
        onClick={() => setErrorMessage(ErrorMessage.NONE)}
        aria-label="Close error message"
      />
      {errorMessage}
    </div>
  );
};
