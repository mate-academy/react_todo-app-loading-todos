/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import classNames from 'classnames';

type Props = {
  testError: string,
  typeError: string,
  stateError: boolean,
  setNotification: (state: boolean) => void,
};

export const Notification: React.FC<Props> = (
  {
    testError, typeError, setNotification, stateError,
  },
) => {
  const error = typeError === 'error';
  const success = typeError === 'success';

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification',
        'has-text-weight-normal',
        {
          'is-danger': error,
          'is-light': success,
          hidden: stateError,
        },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setNotification(true)}
      />
      {testError}
    </div>
  );
};
