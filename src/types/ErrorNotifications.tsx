/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import classNames from 'classnames';
import {
  NotificationProps,
} from '../components/ErrorNotifications/NotificationProps';

export const ErrorNotifications: React.FC<NotificationProps> = ({
  error,
  setError,
}) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: error === null },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => {
          setError(null);
        }}
      />
      {error}
    </div>
  );
};
