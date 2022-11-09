import classNames from 'classnames';
import React from 'react';

type Props = {
  isError: boolean,
  closeError: () => void,
};

export const Error:React.FC <Props> = React.memo(({ isError, closeError }) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal', {
          hidden: !isError,
        },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        aria-label="Close Error"
        onClick={closeError}
      />

      {/* Unable to add a todo
      <br />
      Unable to delete a todo
      <br />
      Unable to update a todo */}
      No todos
    </div>
  );
});
