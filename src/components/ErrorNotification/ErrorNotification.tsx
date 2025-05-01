import React from 'react';

interface Props {
  message: string | null;
  isHidden: boolean;
  onClose: () => void;
}

export const ErrorNotification: React.FC<Props> = ({
  message,
  isHidden,
  onClose,
}) => (
  <div
    data-cy="ErrorNotification"
    className={`notification is-danger is-light has-text-weight-normal ${
      isHidden ? 'hidden' : ''
    }`}
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
