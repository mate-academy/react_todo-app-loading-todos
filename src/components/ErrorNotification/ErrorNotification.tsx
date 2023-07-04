/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import cn from 'classnames';
import { ErrorMessage } from '../../types/ErrorMessage';

type Props = {
  errorNotification: ErrorMessage;
};

export const ErrorNotification: React.FC<Props> = ({
  errorNotification,
}) => {
  const [isHidden, setIsHidden] = useState(false);

  return (
    <div className={cn('notification is-danger is-light has-text-weight-normal',
      { hidden: isHidden === true })}
    >
      <button
        type="button"
        className="delete"
        onClick={() => setIsHidden(true)}
      />

      {errorNotification}
    </div>
  );
};
