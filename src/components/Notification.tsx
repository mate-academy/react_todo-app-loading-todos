/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect } from 'react';
import classNames from 'classnames';
import { Errors } from '../types/Errors';

type Props = {
  errorType: Errors;
  isErrorShown: boolean;
  onCloseError: () => void;
};

const Notification:React.FC<Props> = ({
  errorType,
  isErrorShown,
  onCloseError,
}) => {
  const errorMessage = `Unable to ${errorType} a todo`;

  useEffect(() => {
    setTimeout(() => onCloseError(), 3000);
  }, []);

  return (
    <>
      <div
        className={classNames(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          { hidden: !isErrorShown },
        )}
      >
        <button
          type="button"
          className="delete"
          onClick={onCloseError}
          aria-label="Close notification about an error"
        />
        {errorMessage}
      </div>
    </>
  );
};

export default Notification;
