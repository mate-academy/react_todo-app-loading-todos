import React, { useContext, useEffect } from 'react';
import classNames from 'classnames';
import { TodoError } from '../types/TodoError';
import { TodoContext } from '../context/todoContext';

export const ErrorNotifications: React.FC = () => {
  const { errorMessage, setErrorMessage } = useContext(TodoContext);

  useEffect(() => {
    setTimeout(() => setErrorMessage(TodoError.empty), 3000);
  }, []);

  return (
    <div
      className={classNames(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        { hidden: !errorMessage },
      )}
    >
      {errorMessage}

      <button
        type="button"
        className="delete"
        aria-label="delete"
        onClick={() => setErrorMessage(TodoError.empty)}
      />
    </div>
  );
};
