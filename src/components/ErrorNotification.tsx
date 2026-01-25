import React from 'react';
import classNames from 'classnames';

type Props = {
  message: string;
  isHidden: boolean;
  onClose: () => void;
};

export const ErrorNotification: React.FC<Props> = ({
  message,
  isHidden,
  onClose,
}) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: isHidden }
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={onClose}
      />

      {message}
    </div>
  );
};
