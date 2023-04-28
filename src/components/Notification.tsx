import React, { useState } from 'react';
import classNames from 'classnames';

export const Notification: React.FC = () => {
  const [isButtonHidden, setIsButtonHidden] = useState(false);
  const handlerNotification = () => {
    setIsButtonHidden(true);
  };

  return (
    <div
      className={classNames(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        { hidden: isButtonHidden },
      )}
    >
      <button
        type="button"
        className="delete"
        onClick={handlerNotification}
      >
        x
      </button>
      Unable to add a todo
    </div>
  );
};
