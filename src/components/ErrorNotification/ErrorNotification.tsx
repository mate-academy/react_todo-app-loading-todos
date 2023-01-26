/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import cn from 'classnames';

type Props = {
  errorMessage: string;
  onCloseMessage: () => void;
};

export const ErrorNotification: React.FC<Props> = ({
  errorMessage,
  onCloseMessage,
}) => {
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
        onClick={onCloseMessage}
      />

      {errorMessage}
    </div>
  );
};
