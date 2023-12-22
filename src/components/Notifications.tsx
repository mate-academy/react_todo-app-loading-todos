/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import cn from 'classnames';
import { useAppErrorContex } from './ErrorContext/ErrorContext';

export const Notification: React.FC = React.memo(() => {
  const { errors, closeError } = useAppErrorContex();

  return (
    <>
      {errors.map((error) => (
        <div
          key={error.id}
          data-cy="ErrorNotification"
          className={cn(
            'notification is-danger is-light has-text-weight-normal',
            { hidden: error.hidden },
          )}
        >
          <button
            data-cy="HideErrorButton"
            type="button"
            className="delete"
            onClick={() => closeError(error.id)}
          />
          {error.messege}
          <br />
        </div>
      ))}
    </>
  );
});
