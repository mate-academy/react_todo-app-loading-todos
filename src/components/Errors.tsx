import React from 'react';
import cn from 'classnames';

interface Props {
  message: string;
  clearError: () => void;
}

export const Errors: React.FC<Props> = ({ message, clearError }) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={cn(
        'notification',
        'is-danger',
        'is-light has-text-weight-normal',
        { hidden: !message },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={clearError}
      />
      {/* show only one message at a time */}
      {message}
    </div>
  );
};
