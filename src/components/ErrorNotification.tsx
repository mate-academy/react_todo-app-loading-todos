import React from 'react';

interface ErrorNotificationProps {
  error: string | null;
  onHideError: () => void;
}

export const ErrorNotification: React.FC<ErrorNotificationProps> = ({
  error,
  onHideError,
}) => (
  <div
    data-cy="ErrorNotification"
    className={`notification is-danger is-light has-text-weight-normal ${error ? '' : 'hidden'}`}
  >
    {error ?? ''}
    <button
      data-cy="HideErrorButton"
      type="button"
      className="delete"
      onClick={onHideError}
    />
  </div>
);
