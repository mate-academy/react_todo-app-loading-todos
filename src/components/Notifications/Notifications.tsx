import classNames from 'classnames';
import { useEffect } from 'react';
import { ErrorsType } from '../../types/ErrorsType';

type NotificationsProps = {
  errors: ErrorsType;
  setErrors: React.Dispatch<React.SetStateAction<ErrorsType>>;
};

export const Notifications: React.FC<NotificationsProps> = ({
  errors: { load },
  setErrors,
}) => {
  const handleCLoseNotifications = () => {
    setErrors({
      load: false,
    });
  };

  useEffect(() => {
    // hide after 3 seconds
    const hideNotificationTimer = setTimeout(() => {
      setErrors({ load: false });
    }, 3000);

    // clean up the timer
    return () => {
      clearTimeout(hideNotificationTimer);
    };
  }, []);

  return (
    <div
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !load },
      )}
    >
      <button
        type="button"
        className="delete"
        aria-label="delete-notification"
        onClick={handleCLoseNotifications}
      />

      {/* show only one message at a time */}
      {load && (
        <>
          Unable to load todos
          <br />
        </>
      )}

      {false && (
        <>
          Unable to add a todo
          <br />
        </>
      )}
      {false && (
        <>
          Unable to delete a todo
          <br />
        </>
      )}
      {false && (
        <>
          Unable to update a todo
          <br />
        </>
      )}
    </div>
  );
};
