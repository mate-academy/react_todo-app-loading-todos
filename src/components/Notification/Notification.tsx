/* eslint-disable jsx-a11y/control-has-associated-label */

import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';

export type ErrorAction = '' | 'load' | 'add' | 'delete' | 'update';

type Props = {
  action: ErrorAction;
  onClose: () => void;
};

export const Notification: FC<Props> = ({
  action,
  onClose,
}) => {
  const [error, setError] = useState('');
  const message = `Unable to ${error} a todo`;

  useEffect(() => {
    if (action !== '') {
      setError(action);
    }
  }, [action]);

  return (
    <div
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !action },
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
