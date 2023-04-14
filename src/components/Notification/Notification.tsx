import React, { useState } from 'react';
import classNames from 'classnames';
import { ErrorMessageType } from '../../types/ErrorMessageTupe';

export const Notification: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismissClick = () => {
    setIsVisible(false);
  };

  return (
    <div className={classNames(
      'notification is-danger is-light has-text-weight-normal',
      { hidden: !isVisible },
    )}
    >
      <button
        type="button"
        className="delete"
        onClick={handleDismissClick}
        aria-label="Dismiss error message"
      />

      {`Unable to ${ErrorMessageType} a todo`}

    </div>
  );
};
