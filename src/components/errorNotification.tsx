/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import classnames from 'classnames';

type Props = {
  onNotificationClose: () => void,
  isErrorOccuring: boolean,
};
export const ErrorNotification: React.FC<Props> = ({
  onNotificationClose,
  isErrorOccuring,
}) => {
  return (
    <div className={classnames('notification', 'is-danger',
      'is-light', 'has-text-weight-normal', { hidden: isErrorOccuring })}
    >
      <button
        type="button"
        className="delete"
        onClick={onNotificationClose}
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
