import React, { memo, useEffect, useRef } from 'react';
import { ErrorNotifications } from '../../types/ErrorNotifications';
import classNames from 'classnames';

type Props = {
  errorType: ErrorNotifications | null;
  closeNotification: () => void;
};

export const ErrorNotification: React.FC<Props> = memo(
  ({ errorType, closeNotification }) => {
    const timeoutRef = useRef<number | null>(null);

    useEffect(() => {
      if (!errorType) {
        return;
      }

      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(() => {
        closeNotification();
      }, 3000);

      return () => {
        if (timeoutRef.current !== null) {
          window.clearTimeout(timeoutRef.current);
        }
      };
    }, [errorType, closeNotification]);

    return (
      <div
        data-cy="ErrorNotification"
        // className="notification is-danger is-light has-text-weight-normal"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !errorType },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={closeNotification}
        />
        {errorType}
      </div>
    );
  },
);

ErrorNotification.displayName = 'ErrorNotification';
