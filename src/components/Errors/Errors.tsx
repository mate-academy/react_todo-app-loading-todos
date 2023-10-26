import React from 'react';

type Props = {
  error: string | null;
};

export const Errors: React.FC<Props> = ({ error }) => {
  const unableToLoad = 'Unable to load todos';
  const shouldNotBeEmpty = 'Title should not be empty';
  const unableToAdd = 'Unable to add a todo';
  const unableToDelete = 'Unable to delete a todo';
  const unableToUpdate = 'Unable to update a todo';

  return (
    error !== null ? (
      /* Notification is shown in case of any error */
      /* Add the 'hidden' class to hide the message smoothly */
      <div
        data-cy="ErrorNotification"
        className="notification is-danger is-light has-text-weight-normal"
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
        >
          .
        </button>
        {/* show only one message at a time */}
        {error === unableToLoad && 'Unable to load todos'}
        {error === shouldNotBeEmpty && 'Title should not be empty'}
        {error === unableToAdd && 'Unable to add a todo'}
        {error === unableToDelete && 'Unable to delete a todo'}
        {error === unableToUpdate && 'Unable to update a todo'}
      </div>
    ) : null
  );
};
