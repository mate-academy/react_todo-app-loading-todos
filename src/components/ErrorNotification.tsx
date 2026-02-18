import React from 'react';

type Props = {
  errorMessage: string | null;
  onClose: () => void;
};

export const ErrorNotification: React.FC<Props> = ({
  errorMessage,
  onClose,
}) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={
        !errorMessage
          ? 'notification is-danger is-light has-text-weight-normal hidden'
          : 'notification is-danger is-light has-text-weight-normal'
      }
    >
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
