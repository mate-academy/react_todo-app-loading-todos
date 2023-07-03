/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState, useEffect, FC } from 'react';
import cn from 'classnames';

export const Notification: FC = () => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setHidden(true);
    }, 3000);
  }, []);

  return (
    <div className={cn(
      'notification is-danger is-light has-text-weight-normal',
      { hidden },
    )}
    >
      <button
        type="button"
        className="delete"
        onClick={() => setHidden(true)}
      />

      {/* show only one message at a time */}
      Unable to add a todo
      <br />
      Unable to delete a todo
      <br />
      Unable to update a todo
    </div>
  );
};
