import React from 'react';
import { Error } from '../types/Error';

type Props = {
  error: Error | null;
  close: () => void;
};

export const ErrorMessage: React.FC<Props> = ({ error, close }) => {
  return (
    <>
      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className="notification is-danger is-light has-text-weight-normal"
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          aria-label="hideErrorButton"
          onClick={close}
        />
        <p>{error}</p>
      </div>
    </>
  );
};
