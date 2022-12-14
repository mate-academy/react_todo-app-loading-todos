import classNames from 'classnames';
import React from 'react';
import { ErrorNotification } from '../../types/ErrorNotification';

type Props = {
  error: ErrorNotification;
  onErrorChange: (error: ErrorNotification) => void;
};

export const Error: React.FC<Props> = ({ error, onErrorChange }) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={classNames('notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal', {
          hidden: error === ErrorNotification.None,
        })}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => onErrorChange(ErrorNotification.None)}
      />
      {error}
    </div>
  );
};
