import React from 'react';
import cn from 'classnames';

type ErrorProps = {
  error: string;
};

export const Error: React.FC<ErrorProps> = ({ error }) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={cn('notification is-danger is-light has-text-weight-normal', {
        hidden: !error,
      })}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        aria-label="Close notification"
      />
      {/* show only one message at a time */}
      {error}
    </div>
  );
};
