/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';

type Props = {
  errorMessage: string;
  setErrorMessage: (errorMessage: string) => void;
};

export const Notification: React.FC<Props> = ({
  errorMessage,
  setErrorMessage,
}) => {
  const timerId = useRef<number>(0);

  useEffect(() => {
    if (timerId.current) {
      window.clearTimeout(timerId.current);
    }

    timerId.current = window.setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  }, [errorMessage]);

  return (
    <div
      className={classNames(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal', {
          hidden: !errorMessage,
        },
      )}
      data-cy="ErrorNotification"
    >
      <button
        type="button"
        className="delete"
        onClick={() => setErrorMessage('')}
        data-cy="HideErrorButton"
      />

      {errorMessage}
    </div>
  );
};
