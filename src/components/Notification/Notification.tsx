import cn from 'classnames';
import { useEffect, useState } from 'react';

type Props = {
  error: string | null;
};

export const NotificationModal = ({ error }: Props) => {
  const [notificationVisible, setNotificationVisible] = useState(false);

  useEffect(() => {
    if (error) {
      setNotificationVisible(true);
    }

    setTimeout(() => {
      setNotificationVisible(false);
    }, 3000);
  }, [error]);

  return (
    <div
      className={cn(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        { hidden: !notificationVisible },
      )}
    >
      <button
        type="button"
        className="delete"
        aria-label="Close notification"
        onClick={() => setNotificationVisible(false)}
      />
      {/* show only one message at a time */}
      {error === 'downloading' && <span>Unable to download</span>}

      {error === 'adding' && <span>Unable to add a todo</span>}

      {error === 'deleteing' && <span>Unable to delete a todo</span>}

      {error === 'updating' && <span>Unable to update a todo</span>}
    </div>
  );
};
