import classNames from 'classnames';
import React from 'react';
import { ErrorType } from '../../types/ErrorType';

type Props = {
  error: ErrorType,
  onHandleErrorRemove: React.MouseEventHandler
};

export const Error: React.FC<Props> = ({
  error,
  onHandleErrorRemove,
}) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        { hidden: error === ErrorType.success },
      )}
    >
      <button
        aria-label="hide_error"
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={onHandleErrorRemove}
      />
      {error}
    </div>
  );
};
