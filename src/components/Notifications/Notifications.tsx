import React, { useEffect, useState } from 'react';
import cn from 'classnames';

type Props = {
  errorType: string,
  isError: boolean,
  setIsError: (value: boolean) => void;
};
export const Notifications: React.FC<Props> = (
  {
    errorType,
    isError,
    setIsError,
  },
) => {
  const [isHidden, setIsHidden] = useState(true);

  const closeNotification = () => {
    const timeOutId = window.setTimeout(() => {
      setIsHidden(true);
      setIsError(false);
    }, 3000);

    window.clearTimeout(timeOutId);
  };

  useEffect(() => {
    if (isError) {
      setIsHidden(false);
      closeNotification();
    } else {
      setIsHidden(true);
    }
  }, [isError]);

  return (
    <div
      className={cn(
        'notification is-danger is-light has-text-weight-normal',
        {
          hidden: isHidden,
        },
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
      {`Unable to ${errorType} a todo`}
    </div>
  );
};
