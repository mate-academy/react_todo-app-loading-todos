import React, { useState } from 'react';
import classNames from 'classnames';

export const Notification: React.FC = () => {
  const [isClosed, setIsClosed] = useState(false);

  setTimeout(() => {
    setIsClosed(true);
  }, 3000);

  return (
    <div
      className={classNames(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        {
          hidden: isClosed,
        },
      )}
    >
      <button
        type="button"
        aria-label="delete"
        className="delete"
        onClick={() => setIsClosed(true)}
      />
      Unable to load a todo
    </div>
  );
};
