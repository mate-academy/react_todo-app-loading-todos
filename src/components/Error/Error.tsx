import React from 'react';
import classNames from 'classnames';

type Props = {
  error: boolean;
  setError: (item: boolean) => void;
};

export const Error: React.FC<Props> = ({
  error,
  setError,
}) => {
  if (error) {
    setTimeout(() => {
      setError(false);
    }, 3000);
  }

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
        onClick={() => setError(false)}
      >
        <></>
      </button>

      Unable to add a todo
      <br />
      Unable to delete a todo
      <br />
      Unable to update a todo
    </div>
  );
};
