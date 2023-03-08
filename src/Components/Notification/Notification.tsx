import classNames from 'classnames';
import React from 'react';

import { Errors } from '../../types/Errors';

type Props = {
  isError: boolean,
  errorMessage: Errors | null,
  closeError: () => void;
};

const Notification: React.FC<Props> = ({
  isError,
  errorMessage,
  closeError,
}) => {
  if (isError) {
    setTimeout(() => {
      closeError();
    }, 3000);
  }

  return (
    <div
      className={
        classNames(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          { hidden: !isError },
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
