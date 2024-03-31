import React from 'react';
import { ErrorMessages } from '../types/ErrorMessages';
import classNames from 'classnames';

type Props = {
  errorMessage: ErrorMessages | null;
  clearError: () => void;
};

export const ErrorNotification: React.FC<Props> = ({
  errorMessage,
  clearError,
}) => {
  return (
    <>
      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !errorMessage },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => clearError()}
        />
        {errorMessage}
      </div>
    </>
  );
};
