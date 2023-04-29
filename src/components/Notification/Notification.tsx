/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import classNames from 'classnames';

type Props = {
  isLoadingError: boolean;
  removeNotification: () => void;
};

export const Notification: React.FC<Props> = ({
  isLoadingError, removeNotification,
}) => {
  return (
    <div
      className={classNames(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        { hidden: !isLoadingError },
      )}
    >
      <button
        type="button"
        className="delete"
        onClick={removeNotification}
      />
      Unable to load todos
    </div>
  );
};
