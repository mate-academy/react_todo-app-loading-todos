import React from 'react';
import classNames from 'classnames';

type Props = {
  setIsHideError: (hide: Error | null) => void;
  isHideError: Error | null
};

export const Notification: React.FC<Props> = React.memo(({
  setIsHideError,
  isHideError,
}) => {
  return (
    <div className={classNames(
      'notification is-danger is-light has-text-weight-normal',
      { hidden: !isHideError },
    )}
    >
      <button
        type="button"
        className="delete hidden"
        id="delete"
        onClick={() => setIsHideError(null)}
      >
        Delete
      </button>

      {/* show only one message at a time */}
      Unable to add a todo
      <br />
      Unable to delete a todo
      <br />
      Unable to update a todo
    </div>
  );
});
