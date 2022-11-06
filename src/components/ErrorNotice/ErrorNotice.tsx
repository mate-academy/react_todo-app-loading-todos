/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, { useCallback } from 'react';

interface Props {
  hasError: boolean,
  setHasError: (status: boolean) => void,
}

export const ErrorNotice: React.FC<Props> = ({ hasError, setHasError }) => {
  if (hasError) {
    setTimeout(() => {
      setHasError(false);
    }, 3000);
  }

  const closeErrorNotice = useCallback(() => setHasError(false), []);

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
        onClick={closeErrorNotice}
      />

      Unable to add a todo
      <br />
      Unable to delete a todo
      <br />
      Unable to update a todo
    </div>
  );
};
