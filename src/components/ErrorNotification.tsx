/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

interface Props {
  errorMessage: string;
  onClose: () => void;
}

export const ErrorNotification: React.FC<Props> = ({
  errorMessage,
  onClose,
}) => {
  const notificationClass = [
    'notification',
    'is-danger',
    'is-light',
    'has-text-weight-normal',
    !errorMessage ? 'hidden' : '',
  ].join(' ');

  return (
    <div data-cy="ErrorNotification" className={notificationClass}>
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={onClose}
      />
      {errorMessage}
    </div>
  );
};