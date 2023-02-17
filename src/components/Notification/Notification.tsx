import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

type Props = {
  hasError: boolean,
  setHasError: (bool: boolean) => void
  errorMessage: string,
};

export const Notification: React.FC<Props> = ({
  hasError,
  setHasError,
  errorMessage,
}) => {
  const [isHidden, setIsHidden] = useState(true);

  const closeNotification = () => {
    const timeId = window.setTimeout(() => {
      setIsHidden(true);
      setHasError(false);
    }, 3000);

    window.clearTimeout(timeId);
  };

  useEffect(() => {
    if (hasError) {
      setIsHidden(false);
      closeNotification();
    } else {
      setIsHidden(true);
    }
  }, [hasError]);

  return (
    <div className={classNames(
      'notification is-danger is-light has-text-weight-normal',
      { hidden: isHidden },
    )}
    >

      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button
        type="button"
        className="delete"
        onClick={() => {
          setIsHidden(true);
        }}
      />
      {errorMessage}
    </div>
  );
};
