import React from 'react';
import classNames from 'classnames';
import { ErrorText } from '../../types/ErrorText';

type Props = {
  operation: ErrorText,
  onHideError: (text: ErrorText) => void,
};

export const Notifications: React.FC<Props> = ({ operation, onHideError }) => {
  const handlerDeleteError = () => onHideError(ErrorText.null);

  if (operation.length > 0) {
    setTimeout(handlerDeleteError, 3000);
  }

  return (
    <div className={classNames(
      'notification',
      'is-danger',
      'is-light',
      'has-text-weight-normal',
      { hidden: !operation.length },
    )}
    >
      {`Unable to ${operation} a todo`}
      {/* eslint-disable-next-line */}
      <button
        type="button"
        className="delete"
        onClick={handlerDeleteError}
      />
    </div>
  );
};

// Notification is shown in case of any error
// Add the 'hidden' class to hide the message smoothly
