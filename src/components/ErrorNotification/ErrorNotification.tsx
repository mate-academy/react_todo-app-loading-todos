import React from 'react';
import classNames from 'classnames';

type Props = {
  hasError: boolean,
  setHasError:(error: boolean) => void,
};

export const ErrorNotification: React.FC<Props> = ({
  hasError,
  setHasError,
}) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !hasError },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        aria-label="label"
        onClick={() => setHasError(false)}
      />

      {hasError && 'Unable to download todos from server'}

      {/* Unable to add a todo
      <br />
      Unable to delete a todo
      <br />
      Unable to update a todo */}
    </div>
  );
};
