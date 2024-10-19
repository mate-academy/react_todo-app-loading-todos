import React, { useEffect } from 'react';
import classNames from 'classnames';

type Props = {
  errorMessage: string;
  onError: (val: string) => void;
};

export const ErrorNotification: React.FC<Props> = ({
  errorMessage,
  onError,
}) => {
  // @ts-ignore
  useEffect(() => {
    if (errorMessage) {
      const timer = window.setTimeout(() => {
        onError('');
      }, 3000);

      return () => window.clearTimeout(timer);
    }
  }, [errorMessage, onError]);

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !errorMessage },
      )}
    >
      {errorMessage && (
        <>
          <button
            data-cy="HideErrorButton"
            type="button"
            className="delete"
            onClick={() => onError('')}
          />
          {errorMessage}
        </>
      )}
    </div>
  );
};
