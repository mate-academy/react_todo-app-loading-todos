import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

type Props = {
  errorNotification: boolean;
  setErrorNotification: (value: boolean) => void;
};

export const ErrorNotification: React.FC<Props> = ({
  errorNotification,
  setErrorNotification,
}) => {
  const [hideError, setHideError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorNotification(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [errorNotification]);

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: hideError },
      )}
    >
      <button
        aria-label="delete"
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setHideError(true)}
      />
      {errorNotification}
    </div>
  );
};
