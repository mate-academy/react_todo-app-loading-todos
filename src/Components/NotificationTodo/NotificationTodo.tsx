import React, { useEffect } from 'react';
import classNames from 'classnames';

type PropsType = {
  error: boolean,
  setError: React.Dispatch<React.SetStateAction<boolean>>;
};

export const NotificationTodo: React.FC<PropsType> = ({ error, setError }) => {
  useEffect(() => {
    setTimeout(() => setError(false), 3000);
  }, []);

  return (
    <div className={classNames(
      'notification is-danger is-light has-text-weight-normal',
      { hidden: !error },
    )}
    >

      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button type="button" className="delete" />

      {/* show only one message at a time */}
      Unable to add a todo
      <br />
      Unable to delete a todo
      <br />
      Unable to update a todo
    </div>
  );
};
