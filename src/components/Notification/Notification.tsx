/* eslint-disable jsx-a11y/control-has-associated-label */
import cn from 'classnames';
import React, { useContext, useEffect } from 'react';
import { TodosContext } from '../../TodosContext';

export const Notification: React.FC = () => {
  const { errorMessage, setErrorMessage } = useContext(TodosContext);
  let timeoutId = 0;

  useEffect(() => {
    timeoutId = window.setTimeout(() => setErrorMessage(''), 3000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div
      className={cn('notification is-danger is-light has-text-weight-normal', {
        hidden: !errorMessage,
      })}
    >
      <button
        type="button"
        className="delete"
        onClick={() => setErrorMessage('')}
      />
      {errorMessage}
    </div>
  );
};
