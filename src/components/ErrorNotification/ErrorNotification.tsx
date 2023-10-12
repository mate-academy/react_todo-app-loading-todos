import React from 'react';

import './ErrorNotification.scss';

export const ErrorNotification: React.FC = () => {
  return (
    <div
      data-cy="ErrorNotification"
      className="notification is-danger is-light has-text-weight-normal"
    >
      {/* <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
      /> */}

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      {/* show only one message at a time */}
      {false && (
        <>
          Unable to load todos
          <br />
          Title should not be empty
          <br />
          Unable to add a todo
          <br />
          Unable to delete a todo
          <br />
          Unable to update a todo
        </>
      )}
    </div>
  );
};
