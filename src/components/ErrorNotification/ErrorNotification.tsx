import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

export enum ErrorMessages {
  NONE = '',
  FAILED_LOAD = 'Unable to load todos',
  EMPTY_TITLE = 'Title should not be empty',
  FAILED_ADD = 'Unable to add a todo',
  FAILED_DELETE = 'Unable to delete a todo',
  FAILED_UPDATE = 'Unable to update a todo',
}

type Props = {
  errorMessage: ErrorMessages;
  onClose?: () => void;
};

const DISPLAY_TIME = 3000;

export const ErrorNotification: React.FC<Props> = ({
  errorMessage,
  onClose,
}) => {
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    if (errorMessage === ErrorMessages.NONE) {
      setIsHidden(true);
      return;
    }

    setIsHidden(false);

    const timerId = setTimeout(() => {
      setIsHidden(true);
      if (onClose) {
        onClose();
      }
    }, DISPLAY_TIME);

    return () => {
      clearTimeout(timerId);
    };
  }, [errorMessage, onClose]);

  const handleClose = () => {
    setIsHidden(true);
    if (onClose) {
      onClose();
    }
  };

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        {
          hidden: isHidden,
        },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={handleClose}
      />
      {errorMessage}
    </div>
  );
};