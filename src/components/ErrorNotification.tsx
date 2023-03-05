/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

type Props = {
  errorType: string;
  hasError: boolean;
  setHasError: React.Dispatch<boolean>;
};

export const ErrorNotification: React.FC<Props> = ({
  errorType,
  hasError,
  setHasError,
}) => {
  const [isHidden, setIsHidden] = useState(true);
  const errorMessage = `Unable to ${errorType} a todo`;

  useEffect(() => {
    const removeNotification = () => {
      window.setTimeout(() => {
        setIsHidden(true);
        setHasError(false);
      }, 3000);
    };

    if (hasError) {
      setIsHidden(false);
      removeNotification();
    } else {
      setIsHidden(true);
    }
  }, []);

  return (
    <div
      className={classNames(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal', {
          hidden: isHidden,
        },
      )}
    >
      <button
        type="button"
        className="delete"
        onClick={() => setIsHidden(true)}
      />
      {errorMessage}
    </div>
  );
};
