import React from 'react';
import classNames from 'classnames';
import { Error } from '../../types/Error';

type Props = {
  error: Error;
  isError: boolean;
  onErrorChange: (error: boolean) => void;
};

export const ErrorNotification: React.FC<Props> = ({
  error, isError, onErrorChange,
}) => (
  <div
    data-cy="ErrorNotification"
    className={classNames(
      'notification',
      'is-danger',
      'is-light',
      'has-text-weight-normal',
      { hidden: !isError },
    )}
  >
    <button
      data-cy="HideErrorButton"
      type="button"
      className="delete"
      aria-label="HideError"
      onClick={() => onErrorChange(false)}
    />

    {error}
  </div>
);
