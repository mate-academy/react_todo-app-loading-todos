import React from 'react';

interface ErrorNotificationProps {
  errorNotification: string;
}

export const ErrorNotification: React.FC<ErrorNotificationProps> = ({
  errorNotification,
}) => {
  return (
    /* DON'T use conditional rendering to hide the notification */
    /* Add the 'hidden' class to hide the message smoothly */
    <div
      data-cy="ErrorNotification"
      className={`notification is-danger is-light has-text-weight-normal ${errorNotification === '' ? 'hidden' : ''}`}
    >
      <button data-cy="HideErrorButton" type="button" className="delete" />
      {errorNotification}
      {/* show only one message at a time */}
      {/* Unable to load todos
      <br />
      Unable to add a todo
      <br />
      Unable to delete a todo
      <br />
      Unable to update a todo */}
    </div>
  );
};
