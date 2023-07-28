/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React from 'react';

type Props = {
  error: string,
};

export const Notifications: React.FC<Props> = ({ error }) => {
  return (
    <div className={classNames(
      'notification is-danger is-light has-text-weight-normal', {
        hidden: !error,
      },
    )}
    >
      <button type="button" className="delete" />
      {error}
    </div>
  );
};
