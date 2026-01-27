import React from 'react';
import classNames from 'classnames';

type Props = {
  error: string | null;
  clearError: () => void;
};

export const Error: React.FC<Props> = ({ error, clearError }) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !error },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={clearError}
      />
      {error}
      {/* show only one message at a time
      Unable to load todos
      <br />
      Title should not be empty
      <br />
      Unable to add a todo
      <br />
      Unable to delete a todo
      <br />
      Unable to update a todo*/}
    </div>
  );
};
