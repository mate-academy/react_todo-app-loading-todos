import classNames from 'classnames';
import React, { useEffect } from 'react';

import { Errors } from '../../types/Errors';

type Props = {
  errorMessage: Errors | null,
  closeError: () => void;
};

const Notification: React.FC<Props> = ({
  errorMessage,
  closeError,
}) => {
  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        closeError();
      }, 3000);
    }
  });

  return (
    <div
      className={
        classNames(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          { hidden: !errorMessage },
        )
      }
    >
      <button
        type="button"
        className="delete"
        aria-label="close error"
        onClick={closeError}
      />

      {errorMessage === Errors.UPLOAD
        ? `Unable to ${errorMessage} todos`
        : `Unable to ${errorMessage} a todo`}
    </div>
  );
};

export default Notification;
