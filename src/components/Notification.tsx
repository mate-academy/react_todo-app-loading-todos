import React from 'react';
import classNames from 'classnames';

type Props = {
  errorMessage: string;
  onClose: () => void;
};

export const Notification: React.FC<Props> = ({ onClose, errorMessage }) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        { hidden: !errorMessage },
      )}
    >
      <button
        onClick={onClose}
        data-cy="HideErrorButton"
        type="button"
        className="delete"
      />
      {errorMessage}
    </div>
  );
};
