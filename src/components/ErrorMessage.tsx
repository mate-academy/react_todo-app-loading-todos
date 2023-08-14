/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint(jsx-a11y/label-has-associated-control) */
/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';
import classNames from 'classnames';

type Props = {
  error: string,
  setError: (error: string) => void,
};

export const ErrorMessage: React.FC<Props> = ({ error, setError }) => {
  return (
    <div className={classNames(
      'notification is-danger is-light has-text-weight-normal',
      { hidden: error === '' },
    )}
    >
      <button
        type="button"
        className="delete"
        onClick={() => setError('')}
      />
      {error}
    </div>
  );
};
