import React, { useEffect } from 'react';
import classNames from 'classnames';

import { ErrorMessage } from '../../enums/ErrorMessage';

type Props = {
  errorMessage: ErrorMessage;
  isErrorShown: boolean;
  onErrorClose: () => void;
};

export const ErrorNotification: React.FC<Props> = ({
  errorMessage,
  isErrorShown,
  onErrorClose,
}) => {
  useEffect(() => {
    setTimeout(() => onErrorClose(), 3000);
  }, []);

  return (
    <div
      className={classNames(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        {
          hidden: !isErrorShown,
        },
      )}
    >
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
