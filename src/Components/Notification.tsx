import React, { useState } from 'react';
import classNames from 'classnames';

export const Notification: React.FC = () => {
  const [isButtonDelete, setIsButtonDelete] = useState(true);

  return (
    <div className={classNames(
      'notification is-danger is-light has-text-weight-normal',
      { hidden: !isButtonDelete },
    )}
    >
      {/* eslint-disable-next-line */}
      <button
        type="button"
        className="delete"
        onClick={() => setIsButtonDelete(false)}
      />
      Unabale to add a todo
    </div>
  );
};
