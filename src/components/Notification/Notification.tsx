import React from 'react';
import cn from 'classnames';

interface Props {
  hasError: boolean;
  onCloseNotification: () => void
}

export const Notification: React.FC<Props> = ({
  hasError,
  onCloseNotification,
}) => {
  return (
    <div className={cn(
      'notification is-danger is-light has-text-weight-normal',
      { hidden: !hasError },
    )}
    >
      <button
        type="button"
        className="delete"
        aria-label="deleteNotification"
        onClick={onCloseNotification}
      />

      {/* show only one message at a time */}
      Unable to add a todo
      <br />
      Unable to delete a todo
      <br />
      Unable to update a todo
    </div>
  );
};
