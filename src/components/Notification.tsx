import { FC, useState, useEffect } from 'react';
import { Error } from '../utils/Error';

type Props = {
  errorMessage: Error ;
};

export const Notification: FC <Props> = ({ errorMessage }) => {
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    showNotification ? (
      <div className="notification is-danger is-light has-text-weight-normal">
        <button
          type="button"
          className="delete"
          aria-label="Mute volume"
          onClick={() => setShowNotification(true)}
        />
        {errorMessage}
      </div>
    ) : null
  );
};
