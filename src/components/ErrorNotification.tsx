import React from 'react';
type Props = {
  errorMessage: string;
  onCloseError: () => void;
};

export const ErrorNotification: React.FC<Props> = ({
  errorMessage,
  onCloseError,
}) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={
        errorMessage
          ? 'notification is-danger is-light has-text-weight-normal'
          : 'hidden'
      }
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={onCloseError}
      />
      {errorMessage}
    </div>
  );
};
