import React from 'react';
import cn from 'classnames';

type Props = {
  errorMessage: string;
  clearError: () => void;
};

export const Errors: React.FC<Props> = props => {
  const { errorMessage, clearError } = props;

  return (
    <div
      data-cy="ErrorNotification"
      className={cn(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        { hidden: !errorMessage },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={clearError}
      />
      {errorMessage}
    </div>
  );
};
