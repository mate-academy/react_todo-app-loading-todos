/* eslint-disable jsx-a11y/control-has-associated-label */

import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

export type ErrorAction = '' | 'load' | 'add' | 'delete' | 'update';

type Props = {
  errorMessage: ErrorAction;
  onClose: () => void;
};

export const Notification: React.FC<Props> = ({
  errorMessage,
  onClose,
}) => {
  const [error, setError] = useState('');
  const message = `Unable to ${error} a todo`;

  useEffect(() => {
    if (errorMessage !== '') {
      setError(errorMessage);
    }
  }, [errorMessage]);

  return (
    <div
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !errorMessage },
      )}
    >
      <button
        type="button"
        className="delete"
        onClick={onClose}
      />

      {message}
    </div>
  );
};
