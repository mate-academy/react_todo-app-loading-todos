import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

interface NotificationPropsType {
  hasErrorFromServer: boolean,
  setHasErrorFromServer: (hasErrorFromServer: boolean) => void,
  errorMessage: string,
}

export const Notification: React.FC<NotificationPropsType> = ({
  hasErrorFromServer,
  setHasErrorFromServer,
  errorMessage,
}) => {
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const notificationCloser = () => {
      const timerId = window.setTimeout(() => {
        setHidden(true);
        setHasErrorFromServer(false);
      }, 3000);

      window.clearTimeout(timerId);
    };

    if (hasErrorFromServer) {
      setHidden(false);
      notificationCloser();
    } else {
      setHidden(true);
    }
  });

  return (
    <div className={classNames(
      'notification is-danger is-light',
      { hidden },
    )}
    >
      <button
        type="button"
        className="delete"
        aria-label="Add todo"
        onClick={() => setHidden(true)}
      />

      {`Unable to ${errorMessage} a todo`}
      <br />
    </div>
  );
};
