import classNames from 'classnames';
import { useEffect, useState } from 'react';
/* eslint-disable jsx-a11y/control-has-associated-label */

const enum NOTIFICATION {
  CLEAR = '',
  ADD = 'Unable to add a todo',
  DELETE = 'Unable to delete a todo',
  UPDATE = 'Unable to update a todo',
}

export const Notifications: React.FC = () => {
  const [notification, setNotification] = useState(NOTIFICATION.DELETE);

  useEffect(() => {
    if (notification !== NOTIFICATION.CLEAR) {
      const timeout = setTimeout(() => {
        setNotification(NOTIFICATION.CLEAR);
      }, 3000);

      return () => clearTimeout(timeout);
    }

    return () => {};
  });

  return (
    <div
      className={
        classNames('notification is-danger is-light has-text-weight-normal', {
          hidden: notification === NOTIFICATION.CLEAR,
        })
      }
    >
      <button
        type="button"
        className="delete"
        onClick={() => setNotification(NOTIFICATION.CLEAR)}
      />
      {notification}
    </div>
  );
};
