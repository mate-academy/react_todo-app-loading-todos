/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect } from 'react';
import classNames from 'classnames';
import { ErrorType } from './enums';

type Props = {
  error: ErrorType | null,
  onErrorHide: (value: ErrorType | null) => void
};

export const ErrorNotification: React.FC<Props> = ({
  error,
  onErrorHide,
}) => {
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        onErrorHide(null);
      }, 3000);
    }
  }, [error]);

  return (
    <>
      {error && (
        <div
          className={classNames(
            'notification is-danger is-light has-text-weight-normal',
            { hidden: !error },
          )}
        >
          {error}
          <button
            type="button"
            className="delete"
            onClick={() => {
              onErrorHide(null);
            }}
          />
        </div>
      )}
    </>
  );
};
