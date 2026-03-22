import React from 'react';
import classNames from 'classnames';
import { ErrorMessage } from '../types/ui';

type Props = {
  message: ErrorMessage | '';
  isVisible: boolean;
  onClose: () => void;
};

export const ErrorNotification: React.FC<Props> = ({
  message,
  isVisible,
  onClose,
}) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !isVisible },
      )}
    >
      <button
        type="button"
        className="delete"
        data-cy="HideErrorButton"
        onClick={onClose}
        aria-label="Hide error"
      />

      {message}
    </div>
  );
};
