import classNames from 'classnames';
import React from 'react';
import { ErrorType } from '../../types/ErrorType';

type Props = {
  error: ErrorType,
  onErrorRemove: React.MouseEventHandler
};

export const Error: React.FC<Props> = ({
  error,
  onErrorRemove,
}) => {
  if (error === ErrorType.Success) {
    return null;
  }

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
      )}
    >
      <button
        aria-label="hide_error"
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={onErrorRemove}
      />
      {error}
    </div>
  );
};
