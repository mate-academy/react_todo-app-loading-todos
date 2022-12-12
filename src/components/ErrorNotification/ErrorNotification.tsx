import React from 'react';

interface Props {
  loadingError: boolean,
  onSetLoadingError: (isError: boolean) => void,
}
export const ErrorNotification: React.FC<Props> = React.memo(({
  loadingError, onSetLoadingError,
}) => {
  return (
    <div
      hidden={!loadingError}
      data-cy="ErrorNotification"
      className="notification is-danger is-light has-text-weight-normal"
    >
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => onSetLoadingError(false)}
      />
      {loadingError && (
        'Unable to add a todo'
      )}
      <br />
      Unable to delete a todo
      <br />
      Unable to update a todo
    </div>
  );
});
