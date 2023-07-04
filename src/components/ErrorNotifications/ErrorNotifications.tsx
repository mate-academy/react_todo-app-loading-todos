import React from 'react';
import cn from 'classnames';

interface Props {
  error: string;
  remove: () => void;
}

export const ErrorNotifications: React.FC<Props> = ({
  error,
  remove,
}) => {
  return (
    <div
      className={cn(
        'notification', 'is-danger', 'is-light', 'has-text-weight-normal', {
          hidden: !error,
        },
      )}
    >
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button
        type="button"
        className="delete"
        onClick={() => remove()}
      />

      {error}
    </div>
  );
};
