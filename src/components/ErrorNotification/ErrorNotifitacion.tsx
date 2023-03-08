import React, { useEffect } from 'react';

import { ErrorMessage } from '../../enums/ErrorMessage';

type Props = {
  errorMessage: ErrorMessage;
  onErrorClose: () => void;
};

export const ErrorNotification: React.FC<Props> = ({
  errorMessage,
  onErrorClose,
}) => {
  useEffect(() => {
    setTimeout(() => onErrorClose(), 3000);
  }, []);

  return (
    <div className="notification is-danger is-light has-text-weight-normal">
      <button
        type="button"
        className="delete"
        onClick={onErrorClose}
        aria-label="Close error message"
      />
      {errorMessage}
    </div>
  );
};
