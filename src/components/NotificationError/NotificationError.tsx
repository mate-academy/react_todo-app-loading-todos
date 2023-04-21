/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect } from 'react';
import classNames from 'classnames';
import { ErrorAction } from '../../types/ErrorAction';

type Props = {
  action: ErrorAction;
  resetError: () => void;
};

export const NotificationError: React.FC<Props> = ({ action, resetError }) => {
  useEffect(() => {
    setTimeout(() => {
      resetError();
    }, 3000);
  }, []);

  return (
    <>
      <div
        className={classNames(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
        )}
      >
        <button
          type="button"
          className="delete"
          onClick={resetError}
        />

        {`Unable to ${action} a todo`}
      </div>
    </>
  );
};
