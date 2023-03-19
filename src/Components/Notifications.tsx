import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

type Props = {
  setError: (error: boolean) => void,
};

export const Notifications: React.FC<Props> = ({ setError }) => {
  const [hidden, setHidden] = useState(false);

  const deleteError = () => {
    setHidden(true);
    setTimeout(() => {
      setError(false);
    }, 1000);
  };

  useEffect(() => {
    setTimeout(() => {
      deleteError();
    }, 3000);
  });

  return (
    <div className={classNames(
      'notification',
      'is-danger',
      'is-light',
      'has-text-weight-normal',
      { hidden },
    )}
    >
      <button
        type="button"
        className="delete"
        aria-label="deleteError"
        onClick={deleteError}
      />

      {/* show only one message at a time */}
      Unable to add a todo
    </div>
  );
};
