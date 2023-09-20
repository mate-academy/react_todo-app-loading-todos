/* eslint-disable jsx-a11y/control-has-associated-label */

import classNames from 'classnames';
import React, { useEffect } from 'react';

type Props = {
  errorMessage: string,
  onCloseErrorMessage: (newError: string) => void,
};

export const Notification: React.FC<Props> = ({
  errorMessage,
  onCloseErrorMessage,
}) => {
  useEffect(() => {
    const timerId = setTimeout(() => {
      onCloseErrorMessage('');
    }, 3000);

    return () => {
      clearTimeout(timerId);
    };
  }, []);

  return (
    <div
      data-cy="ErrorNotification"
      className={
        classNames(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal', {
            hidden: !errorMessage,
          },
        )
      }
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => onCloseErrorMessage('')}
      />

      {/* show only one message at a time */}
      {errorMessage}
      {/* Unable to add a todo
      <br />
      Unable to delete a todo
      <br />
      Unable to update a todo */}
    </div>
  );
};
