/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React from 'react';

type Props = {
  error: string;
  setError: (value: string) => void;
};

export const ErrorNotification: React.FC<Props> = ({ setError, error }) => {
  if (error) {
    setTimeout(() => {
      setError('');
    }, 3000);
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
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setError('')}
      />
      {error}
      {/* Unable to add a todo, Unable to delete a todo, Unable to update a todo */}
    </div>
  );
};
