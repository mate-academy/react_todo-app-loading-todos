/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

type Props = {
  errorType: string;
  onError: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ErrorNotification: React.FC<Props> = ({
  errorType,
  onError,
}) => {
  const [isHidden, setIsHidden] = useState(true);
  const errorMessage = `Unable to ${errorType} a todo`;

  const removeNotification = () => {
    window.setTimeout(() => {
      setIsHidden(true);
      onError(false);
    }, 3000);
  };

  const handleHideNotification = () => {
    setIsHidden(true);
    onError(false);
  };

  useEffect(() => {
    setIsHidden(false);
    removeNotification();
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
        onClick={handleHideNotification}
      />
      {errorMessage}
    </div>
  );
};
