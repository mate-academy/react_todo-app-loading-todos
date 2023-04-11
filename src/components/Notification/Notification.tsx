import classNames from 'classnames';
import { useState } from 'react';

export const Notification: React.FC = () => {
  const [onButtonDelete, setOnButtonDelete] = useState(true);

  return (
    <div className={classNames(
      'notification is-danger is-light has-text-weight-normal',
      { hidden: !onButtonDelete },
    )}
    >
      <button
        type="button"
        className="delete"
        aria-label="Mute volume"
        onClick={() => setOnButtonDelete(false)}
      />

      {/* show only one message at a time */}
      Unable to add a todo
    </div>
  );
};
