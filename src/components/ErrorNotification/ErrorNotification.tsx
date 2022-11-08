import React from 'react';
import classNames from 'classnames';

type Props = {
  hasError: boolean
  onClose: () => void
};

export const ErrorNotification: React.FC<Props> = React.memo(({
  hasError,
  onClose,
}) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal', {
          hidden: !hasError,
        },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        aria-label="Error button"
        onClick={onClose}
      />

      Unable to add a todo
      <br />
      Unable to delete a todo
      <br />
      Unable to update a todo
    </div>
  );
});
