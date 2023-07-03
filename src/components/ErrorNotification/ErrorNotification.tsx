import cn from 'classnames';
import React from 'react';

interface Props {
  error: string,
  closeNotification: () => void,
}

export const ErrorNotification: React.FC<Props> = ({
  error,
  closeNotification,
}) => {
  return (
    <div className={cn(
      'notification',
      'is-danger',
      'is-light',
      'has-text-weight-normal',
      { hidden: !error },
    )}
    >
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button
        type="button"
        className="delete"
        onClick={closeNotification}
      />

      {error}
    </div>
  );
};
