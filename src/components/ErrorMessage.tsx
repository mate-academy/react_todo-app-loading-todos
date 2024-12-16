import cn from 'classnames';
import React from 'react';

type Props = {
  errorMessage: string;
};

export const ErrorMessage: React.FC<Props> = ({ errorMessage }) => {
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
      <button data-cy="HideErrorButton" type="button" className="delete" />
      {errorMessage}
    </div>
  );
};
