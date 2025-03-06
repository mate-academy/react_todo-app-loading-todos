import React from 'react';
import cn from 'classnames';

type ErrorNotificationProps = {
  errorMessage: string | null;
  onHide: () => void;
};

export const ErrorNotification: React.FC<ErrorNotificationProps> = ({
  errorMessage,
  onHide,
}) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={cn('notification is-danger is-light has-text-weight-normal', {
        hidden: !errorMessage,
      })}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={onHide}
      />
      {errorMessage}
    </div>
  );
};
