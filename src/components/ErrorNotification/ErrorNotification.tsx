import React from 'react';

interface ErrorNotificationProps {
  errorNotification: string;
  setErrorNotification: (arg: string) => void;
}

export const ErrorNotification: React.FC<ErrorNotificationProps> = ({
  errorNotification,
  setErrorNotification,
}) => {
  return (
    /* DON'T use conditional rendering to hide the notification */
    /* Add the 'hidden' class to hide the message smoothly */
    <div
      data-cy="ErrorNotification"
      className={`notification is-danger is-light has-text-weight-normal ${errorNotification === '' ? 'hidden' : ''}`}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setErrorNotification('')}
      />
      {errorNotification}
    </div>
  );
};
