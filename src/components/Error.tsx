import classNames from 'classnames';
import React from 'react';

interface Props {
  message: string;
  show: boolean;
  setError: (show: boolean) => void;
}

export default function Error({ message, show, setError }: Props) {
  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !show },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setError(false)}
      />
      {/* show only one message at a time */}
      {message}
      {/* Unable to load todos
      <br />
      Title should not be empty
      <br />
      Unable to add a todo
      <br />
      Unable to delete a todo
      <br />
      Unable to update a todo */}
    </div>
  );
}
