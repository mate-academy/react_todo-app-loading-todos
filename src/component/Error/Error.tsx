/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React from 'react';

interface Props {
  error: boolean,
  onError: () => void,
}

export const Error: React.FC<Props> = ({ error, onError }) => {
  return (
    <div className={classNames(
      'notification is-danger is-light has-text-weight-normal', {
        hidden: !error,
      },
    )}
    >
      <button
        type="button"
        className="delete"
        onClick={onError}
      />
      Unable to connect to server
    </div>
  );
};
