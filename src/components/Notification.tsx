import React, { useState } from 'react';
import classNames from 'classnames';

export const Notification: React.FC = () => {
  const [buttonDelete, setButtonDelete] = useState(false);

  return (
    <div
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: buttonDelete },
      )}
    >
      <button
        type="button"
        className="delete"
        aria-label="Mute volume"
        onClick={() => setButtonDelete(true)}
      />
      Unable to add a todo
    </div>
  );
};
