import React, { useState } from 'react';
import classNames from 'classnames';

export const Notification: React.FC = () => {
  const [isNotificationVisible, setIsNotificationVisible] = useState(true);

  return (
    <div className={classNames(
      'notification is-danger is-light has-text-weight-normal',
      { hidden: !isNotificationVisible },
    )}
    >
      {/* eslint-disable-next-line */}
      <button
        type="button"
        className="delete"
        onClick={() => setIsNotificationVisible(false)}
      />
      Unable to add a todo
    </div>
  );
};
