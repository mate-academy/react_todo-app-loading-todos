import classNames from 'classnames';
import React from 'react';
import { ErrorMessage } from '../../types/ErrorMessage';

type Props = {
  isError: ErrorMessage | null;
  onClose: () => void;
};

export const ErrorNotification: React.FC<Props> = ({ isError, onClose }) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: isError === null },
      )}
    >
      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={onClose}
      />
      {isError}
    </div>
  );
};
