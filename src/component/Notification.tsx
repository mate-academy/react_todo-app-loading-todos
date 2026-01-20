import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

type Props = {
  message: string | null;
  onHide: () => void;
};

export const Notification: React.FC<Props> = ({ message, onHide }) => {
  const [hidden, setHidden] = useState<boolean>(false);

  useEffect(() => {
    if (!message) {
      return;
    }

    setHidden(false);

    const timer = setTimeout(() => {
      setHidden(true);
      setTimeout(onHide, 200);
    }, 3000);

    return () => clearTimeout(timer);
  }, [message, onHide]);

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: hidden || !message },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => {
          setHidden(true);
          setTimeout(onHide, 200);
        }}
      />
      {message}
    </div>
  );
};
