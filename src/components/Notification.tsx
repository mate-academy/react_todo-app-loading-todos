/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

type Props = {
  errorMessage: string;
};

const Notification:React.FC<Props> = ({ errorMessage }) => {
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    const closeErrorNotification = () => {
      const timerId = window.setTimeout(() => {
        setIsHidden(true);
      }, 3000);

      return () => clearTimeout(timerId);
    };

    if (errorMessage.length > 0) {
      setIsHidden(false);
      closeErrorNotification();
    } else {
      setIsHidden(true);
    }
  }, [errorMessage]);

  return (
    <>
      <div
        className={classNames(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          { hidden: isHidden },
        )}
      >
        <button
          type="button"
          className="delete"
          onClick={() => setIsHidden(true)}
        />
        {`Unable to ${errorMessage} a todo`}
      </div>
    </>
  );
};

export default Notification;
