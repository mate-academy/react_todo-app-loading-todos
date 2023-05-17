// import React, { useEffect, useState } from 'react';
import './Notification.scss';
import classNames from 'classnames';

type Props = {
  title: string
  isConnection: boolean
  isErrorMessage: boolean
  closeErrorMessage: () => void;
};

export const Notification: React.FC<Props> = ({
  isErrorMessage,
  closeErrorMessage,
  isConnection,
  title,
}) => {
  // const [isVisible, setIsVisible] = useState(false);
  //
  // useEffect(() => {
  //   setIsVisible(isErrorMessage);
  // }, [isErrorMessage]);

  return (
    <div
      className={classNames(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal', {
          hidden: !isErrorMessage,
        },
      )}
    >
      <button
        aria-label="deleteButton"
        type="button"
        className="delete"
        onClick={closeErrorMessage}
      />
      {!title && isConnection && (
        "Title can't be empty"
      )}
      {title && !isConnection && (
        "Can't create a todo"
      )}
    </div>
  );
};
