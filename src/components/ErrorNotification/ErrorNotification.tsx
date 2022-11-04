import React from 'react';
import classNames from 'classnames';

interface Props {
  hasError: boolean;
  closeNotification: () => void;
}

export const ErrorNotification: React.FC<Props> = React.memo(({
  hasError,
  closeNotification,
}) => (
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
      aria-label="Close notification"
      className="delete"
      onClick={closeNotification}
    />

    Unable to add a todo
    <br />
    Unable to delete a todo
    <br />
    Unable to update a todo
  </div>
));
