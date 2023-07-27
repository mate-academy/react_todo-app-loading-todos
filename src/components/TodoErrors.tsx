/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  error: string;
};

export const TodoErrors: React.FC<Props> = ({ error }) => {
  const [isHidden, setIsHidden] = useState(false);

  setTimeout(() => setIsHidden(true), 3000);

  return (
    <div className={classNames(
      'notification is-danger is-light has-text-weight-normal',
      {
        'notification is-danger is-light has-text-weight-normal hidden':
         isHidden,
      },
    )}
    >
      <button
        type="button"
        className="delete"
        onClick={() => setIsHidden(true)}
      />
      {error}
    </div>
  );
};
