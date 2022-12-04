import classNames from 'classnames';
import React from 'react';

interface Props {
  hasError: boolean;
  closeErrorNotification: () => void;
}

export const ErrorNotification: React.FC<Props> = React.memo(({
  hasError,
  closeErrorNotification,
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
      className="delete"
      aria-label="HideErrorButton"
      onClick={closeErrorNotification}
    />

    <span>
      Failed to load todos from the server!
    </span>
  </div>
));
