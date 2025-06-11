import React from 'react';
import cn from 'classnames';

type ErrorProps = {
  errorMessage: string;
  showError: boolean;
};

export const ErrorComponent: React.FC<ErrorProps> = ({
  errorMessage,
  showError,
}) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={cn('notification is-danger is-light has-text-weight-normal', {
        hidden: !showError,
      })}
    >
      <button data-cy="HideErrorButton" type="button" className="delete" />
      {errorMessage}
    </div>
  );
};
