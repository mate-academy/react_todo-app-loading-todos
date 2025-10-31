import React from 'react';
import cn from 'classnames';

type Props = {
  errorMessage: string;
  onHide: () => void;
};

export const ErrorNotification: React.FC<Props> = ({
  errorMessage: message,
  onHide,
}) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={cn(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        { hidden: !message },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={onHide}
      />
      {message}
    </div>
  );
};
