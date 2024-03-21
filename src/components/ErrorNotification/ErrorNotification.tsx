import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';

const NOTIFICATION_DURATION = 3000;

type Props = {
  message: string;
};

export const ErrorNotification: React.FC<Props> = ({ message }) => {
  const [isShown, setIsShown] = useState(false);
  const timer = useRef(0);

  useEffect(() => {
    if (!message.length) {
      return;
    }

    setIsShown(true);

    timer.current = window.setTimeout(
      () => setIsShown(false),
      NOTIFICATION_DURATION,
    );
  }, [message]);

  const hideError = () => {
    clearTimeout(timer.current);
    setIsShown(false);
  };

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification',
        'is-danger is-light',
        'has-text-weight-normal',
        { hidden: !isShown },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={hideError}
      />
      {message}
    </div>
  );
};
