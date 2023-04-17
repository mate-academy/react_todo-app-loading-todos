import React from 'react';
import classNames from 'classnames';

type Props = {
  error: string,
  setError: (value: string) => void,
};

export const TodoError: React.FC<Props> = ({ error, setError }) => (
  <div className={classNames(
    'notification is-danger is-light has-text-weight-normal', {
      hidden: !error,
    },
  )}
  >

    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
    <button
      type="button"
      className="delete"
      onClick={() => setError('')}
    />
    {error}
  </div>
);
